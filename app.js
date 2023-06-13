// Add API Key here
const API_KEY = ''

const submitIcon = document.querySelector('#submit-icon')
const inputElement = document.querySelector('input')
const imagesSection = document.querySelector('.images-section')

const getImages = async () => {
  console.log(inputElement.value)
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: inputElement.value,
      n: 4,
      size: "1024x1024"
    })
  }
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    data?.data.forEach(imageObject => {
      const imageContainer = document.createElement('div')
      imageContainer.classList.add('image-container')
      const imageElement = document.createElement('img')
      imageElement.setAttribute('src', imageObject.url)
      imageContainer.append(imageElement)
      imagesSection.append(imageContainer)
    })
  } catch (err) {
    console.error(err)
  }
}
submitIcon.addEventListener('click', getImages)

