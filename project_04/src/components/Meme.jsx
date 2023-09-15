import React from "react"
import memesData from "../data/memesData"

export default function Meme() {
    // const[memeImage, setMemeImage] = React.useState("https://i.imgflip.com/30b1gx.jpg")
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/30b1gx.jpg"
    })
    const [allMemeImages, setAllMemeImages] = React.useState(memesData)

    function getMemeImage() {
        const memesArray = allMemeImages.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    return (
        <main>
            <div className="form">
                <input className="form--input" type="text" placeholder="Top text"></input>
                <input className="form--input" type="text" placeholder="Bottom text"></input>
                <button className="form--button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <img className="meme--image" src={meme.randomImage} alt="meme"></img>
        </main>
    )
}