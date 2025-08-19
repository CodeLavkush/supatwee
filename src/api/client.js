import { createClient } from "@supabase/supabase-js"
import conf from "../conf/conf"
import { persistor } from "@/store/store"

const client = createClient(
    conf.projectUrl,
    conf.clientApiKey,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
        }
    }
)

async function signUp({email, password, full_name, age, gender}) {
    const { data, error } = await client.auth.signUp({email, password, options: {data: {full_name, age, gender}}})
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
        throw error 
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
    let { error } = await client.auth.signOut()
    persistor.purge()

    if(error) throw error
    return true
}

async function getAllTweets() {
    let { data, error } = await client.from("Tweets").select("*")
    if(error){
        return error
    }
    else{
        return data
    }
}

async function addTweet(payload) {
    const { data, error } = await client.from("Tweets").insert([payload]).select()
    if(error){
        return error
    }
    else{
        return data
    }
}

async function deleteTweet(tweet_id) {
    const { data, error } = await client.from('Tweets').delete().eq('tweet_id', tweet_id).select()
    if(error) throw error
    return data
}

export {
    client,
    signUp,
    login,
    getUser,
    logout,
    getAllTweets,
    addTweet,
    deleteTweet,
}