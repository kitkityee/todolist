using Dapper;
using Microsoft.Data.Sqlite;
using System.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddScoped<IDbConnection>(_ =>
    new SqliteConnection(builder.Configuration.GetConnectionString("Database")));
var app = builder.Build();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .WithOrigins(app.Configuration.GetSection("AllowedHosts").Get<string[]>()!)
    .AllowCredentials());

app.MapGet("/todos", (IDbConnection db) =>
{
   return db.Query<Item>("SELECT [Content],[Id],[IsCompleted] FROM [Todo]");
});

app.MapPost("/todos", (NewOrUpdatedItem newOrUpdatedItem, IDbConnection db) =>
{
    if (newOrUpdatedItem.Content == null)
    {
        return Results.BadRequest();
    }

    if (newOrUpdatedItem.Id != null)
    {
     db.Execute("UPDATE [Todo] SET [Content] = @Content WHERE [Id] = @Id", new
        {
            Content = newOrUpdatedItem.Content,
            Id  = newOrUpdatedItem.Id
        });
    } else
    {
     db.Execute("INSERT INTO [Todo] ([Content], [IsCompleted]) VALUES (@Content, @IsCompleted)", new
        {
            Content = newOrUpdatedItem.Content,
            IsCompleted = 0
        });
    }
    return Results.Ok();
});

app.MapPost("/checktodos", (CheckItem checkItem, IDbConnection db) =>
{


    db.Execute("UPDATE [Todo] SET [IsCompleted] = @IsCompleted WHERE [Id] = @Id", new
    {
        Id = checkItem.Id,
        IsCompleted = checkItem.IsCompleted
    }) ;
});

app.MapPost("/removecompletedtodos", (IDbConnection db) =>
{
    db.Execute("DELETE FROM [Todo] WHERE [IsCompleted] = 1");

});

app.UseFileServer();
app.Run();

public class Item
{
    public required int Id { get; set; }

    public required bool IsCompleted { get; set; }
    public required string Content { get; set; }
}

public class NewOrUpdatedItem
{
    public required string Content { get; set; }
    public int? Id { get; set; }
}

public class CheckItem
{
    public required int Id { get; set; }
    public required bool IsCompleted { get; set; }
}
