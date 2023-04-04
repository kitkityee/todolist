import TodoList from '@/components/todoList'
import TodoListFunctions from '@/components/titleSection'
import Head from 'next/head'
import TitleSection from '@/components/titleSection'
import { ItemShowConetextProvider } from '@/store/item-show-context'

export default function Home() {
  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex justify-center lg:pt-8 bg-aliceblue h-screen">
        <div className='flex flex-col px-4 py-2 shadow-lg rounded-lg bg-white lg:w-2/5 w-full h-full lg:h-5/6'>
        <ItemShowConetextProvider>
          <TitleSection/>
          <TodoList/>
        </ItemShowConetextProvider>
        </div>
      </div>
    </>
  )
}
