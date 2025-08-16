import { createClient } from "@supabase/supabase-js"
import conf from "../conf/conf"

const client = createClient(
    conf.projectUrl,
    conf.clientApiKey,
)

async function signUp(payload) {
    const { data, error } = await client.auth.signUp(payload)
    if(error){
        return error 
    }
    else{
        return data
    }
}

async function login(payload) {
    const { data, error } = await client.auth.signInWithPassword(payload)
    if(error){
        return error 
    }
    else{
        return data
    }
}

async function getUser() {
    const { data: { user }, error } = await client.auth.getUser()
    if(error){
        return error
    }
    else{
        return user
    }
}

async function logout() {
    let { error } = await supabase.auth.signOut()

    if(error){
        return error
    }
}

async function getAllTweets() {
    let {data: tweets, error } = await client.from("Tweets").select("*")
    if(error){
        return error
    }
    else{
        return tweets
    }
}

async function addTweet(payload) {
    const { data, error } = await client.from("Tweets").insert([payload]).select()
}

async function deleteTweet(tweet_id) {
    const { error } = await client.from('Tweets').delete().eq('tweet_id', tweet_id)
    if(error){
        return error
    }
}

export {
    signUp,
    login,
    getUser,
    logout,
    getAllTweets,
    addTweet,
    deleteTweet,
}