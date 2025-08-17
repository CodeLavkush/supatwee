import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tweets: null
}


const tweetSlice = createSlice({
    name: "tweets",
    initialState,
    reducers: {
        addTweets: (state, action)=>{
            state.tweets = action.payload
        },
        deleteTweets: (state, action)=>{
            state.tweets = state.tweets.filter((tweet) => tweet.tweet_id !== action.payload)
        }
    }
})

export const { addTweets, deleteTweets } = tweetSlice.actions

export default tweetSlice.reducer