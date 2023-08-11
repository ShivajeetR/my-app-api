import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"
const API_KEY: string = process.env.DATA_API_KEY as string


// CREATE
export async function POST(request: Request) {
    const { userId, title }: Partial<Todo> = await request.json()

    if (!userId || !title) return NextResponse.json({"message": "Missing required data"})

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'API-KEY': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed: false
        })
    })

    const newTodo: Todo = await res.json()
    return NextResponse.json(newTodo)
}


// READ
export async function GET() {
  const res = await fetch(DATA_SOURCE_URL)

  const todos: Todo[] = await res.json()
  return NextResponse.json(todos)

}


// UPDATE
export async function PUT(request: Request) {
    const { userId, id, title, completed }: Todo = await request.json()

    if (!userId || !id || !title|| typeof(completed) !== 'boolean') return NextResponse.json({"message": "Missing required data"})

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'API-KEY': API_KEY
        },
        body: JSON.stringify({
            userId, title, completed
        })
    })

    const updatedTodo: Todo = await res.json()
    return NextResponse.json(updatedTodo)
}


// DELETE
export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json()

    if (!id) return NextResponse.json({"message": "Todo is required"})

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'API-KEY': API_KEY
        }
    })
    return NextResponse.json({"message": `Todo ${id} deleted`})
}