// // import { EditProduct } from "@/interfaces"

// export async function GET() {
//   const res = await fetch('http://localhost:3000/api/products', {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//   const data = await res.json()
 
//   return Response.json({ data })
// }

// export async function POST() {
//   const res = await fetch('http://localhost:3000/api/products', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   })
 
//   const data = await res.json()
 
//   return Response.json(data)
// }

// export async function PUT() {
//   const res = await fetch('http://localhost:3000/api/products', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ time: new Date().toISOString() }),
//   })
 
//   const data = await res.json()
 
//   return Response.json(data)
// }