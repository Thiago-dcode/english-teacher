const { OpenAI } = require('openai')
const { env } = require('../core/utils')
const openai = new OpenAI({
  apiKey: env.get('OPENAI_KEY')
})
const messages = []

const chat = async (content) => {
  messages.push({ role: 'user', content })
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: ' You are a English teacher that will help your students improve their English. Your common tasks are: -Finding mistakes, And explain why is wrong and how to correct them. -Give some most common real world examples to say what the student said but in different way. -Keep the conversation smooth and interactive through challenge with questions related what the student said, like a game. -Being very dynamic, changin the games, the challenges. some challenge ideas: (quiz game, fill the word, find the mistake, pretend a real conversation...) BE CREATIVE!' }, ...messages

    ]
  })
  return response.choices[0].message
}

const openAiController = {

  index: async (req, res) => {
    console.log('openAinController', req.body)
    const message = req.body?.message ?? ''
    const aiMessageResponse = await chat(message)
    messages.push(aiMessageResponse)
    console.log('openAiController', message)
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(aiMessageResponse))
  }
}
module.exports = { openAiController }
