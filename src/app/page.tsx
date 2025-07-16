"use client"
import { io } from "socket.io-client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Poppins } from 'next/font/google';
import axios from "axios"
import { useDispatch } from "react-redux"
import { setSenderName, setSenderId } from "@/store/slices"

export default function SignUp() {

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })

  const [error, setError] = useState<string | null>(null)
  const [agree, setAgree] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const client = axios.create({
    baseURL: 'http://127.0.0.1:8000/signup'
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await client.post('', {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      console.log(response)
      const { id, username } = response.data

      dispatch(setSenderId(id))

      dispatch(setSenderName(username))
      router.push('/profile')
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.detail || "SigUp failed. Please try again.")
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
  }
  
  return (
    <div className="min-h-screen flex justify-evenly items-center"
      style={{backgroundImage: "url('/images/background.png')"}}>
      {/* <img src="/images/chatapp-logo.png" alt="" style={{ width: "20%", height: "30%" }} />*/}
      <img src="/images/logochat.png" alt="chat logo" className="" />
      {/* form section */}
      <div className="bg-white p-8 rounded-xl">
        <form onSubmit={handleSignInSubmit} className="flex flex-col gap-5">
          <label className="font-semibold text-2xl">Sign Up</label>
          <input type="text" placeholder="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="p-2 border-1 border-gray-400 border-solid rounded-md" />
          <input type="email" placeholder="Email address"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="p-2 border-1 border-gray-400 border-solid rounded-md" />
          <input name="password" type="password" placeholder="password"
            value={user.password}
            onChange={handleChange}
            className="p-2 border-1 border-gray-400 border-solid rounded-md" />
          <button type="submit"
            disabled={!user.email || !user.password || !user.username || !agree}
            className={`bg-[#077eff] rounded-md text-white cursor-pointer p-2 text-xl`}>
            Create account
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-2 text-gray-500 text-sm" >
            <input type="checkbox" checked={agree}
              onChange={() => setAgree(!agree)} />
            <p >Agree to the terms of use & privacy policy.</p>
          </div>
          <div className="cursor-pointer text-gray-500 flex" >
            <p className="mr-1">
              Already Have an Account ?
            </p>
            <Link href="/login" className="text-[#077eff]">Login here</Link>
          </div>
        </form>
      </div>

    </div >
  )
}