import { prisma } from "@/utils/db"
import { auth, currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Spinner from "../components/Spinner"

const createNewUser = async () => {
  // const {userId} = await auth()
  const user = await currentUser()

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string
    }
  })
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string
      }
    })
  }

  redirect('/journal')
}


const NewUser = async () => {
  await createNewUser()
  return (
    <div>
      <Spinner />
    </div>
  )
}

export default NewUser
