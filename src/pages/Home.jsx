import React, { useEffect, useState } from 'react'
import { getAllTweets, deleteTweet, logout } from '@/api/client'
import {
  Card,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteTweets as deleteTweetSlice, addTweets } from '../store/tweetSlice'
import { logout as authLogout } from '@/store/userSlice'

function Home() {
  const [tweets, setTweets] = useState([])
  const navigate = useNavigate()
  const userStatus = useSelector((state)=> state.user.status)
  const userData = useSelector((state)=> state.user.userData)
  const dispatch = useDispatch()

  useEffect(()=>{
    async function fetchTweets() {
      try {
        const res = await getAllTweets()
        if(res){
          dispatch(addTweets(res))
          setTweets(res)
        }
      } catch (error) {
        console.error("ERROR:", error)
      }
    }
    fetchTweets()
  }, [])

  const handleDelete = async (id)=>{
      try {
        const res = await deleteTweet(id)
        if(res){
          dispatch(deleteTweetSlice(id))
          setTweets((prev) => prev.filter((tweet) => tweet.tweet_id !== id))
        }
      } catch (error) {
        console.error("ERROR:", error)
      }
  }

  const handleLogout = async ()=>{
    try{
      const res = await logout()
      if(res){
        dispatch(authLogout())
        navigate('/')
      }
    } catch(error){
      console.error("ERROR:", error)
    }
  }
  return (
    <div className='w-screen h-screen bg-gray-900'>
      <div className='w-full h-full flex justify-center items-center p-20 flex-col gap-2'>
        <div className='w-200 h-200 bg-gray-700 rounded-4xl p-4 flex flex-col gap-4'>
          <div className='w-full flex justify-between items-center'>
            <h2 className='text-2xl text-white font-bold tracking-wide'>Tweets</h2>
            <p className='text-2xl text-white font-bold'>{userData ? userData?.user_metadata?.full_name : ""}</p>
            <div className=' h-10 flex justify-center gap-4 items-center'>
              {userStatus ? <button onClick={()=> (navigate('/addpost'))} className="btn w-40 btn-primary">Add Post</button> : ""}
              {userStatus ? <button onClick={()=> handleLogout()} className="btn w-40 btn-error">Logout</button> : ""} 
              {!userStatus ? <button onClick={()=> (navigate('/signin'))} className="btn btn-primary">Sign in</button> : ""}
              {!userStatus ? <button onClick={()=> (navigate('/signup'))} className="btn btn-primary">Sign up</button> : ""}
            </div>
          </div>
          <div className='rounded-4xl p-4 flex flex-col gap-4 w-full h-full overflow-y-scroll'>
            {
              tweets.map((tweet)=> (
                <Card key={tweet?.tweet_id}>
                  <CardHeader>
                    <CardTitle>{tweet?.title}</CardTitle>
                    <CardDescription>{tweet?.body}</CardDescription>
                  </CardHeader>
                    <CardFooter className="flex gap-4">
                      <p>{tweet?.posted_on.split("T")[0]}</p>
                      {userStatus && userData?.id == tweet?.user_id ? <button onClick={()=> handleDelete(tweet.tweet_id)} className="btn btn-error">Delete</button> : ''}
                    </CardFooter>
                </Card>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
