const puppeteer = require('puppeteer');

const chat=async(req,res) =>{
  const {inpuText}=req.body
  console.log(req.body)
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://chatgpt.com/');
    
    const inputFieldSelector = 'textarea#prompt-textarea';
    await page.waitForSelector(inputFieldSelector);

    await page.type(inputFieldSelector, inpuText);

    const sendButtonSelector = '[data-testid="send-button"]';
    await page.click(sendButtonSelector);

    const responseSelector = 'div[data-message-author-role="assistant"]';
    await page.waitForSelector(responseSelector);

    const chatbotResponseElement = await page.$(responseSelector);
    
    const chatbotResponse = await page.$eval(responseSelector, element => element.textContent.trim());
    console.log('Chatbot response:', chatbotResponse);
    res.json('sucess')
  } catch (error) {
    console.error('Error:', error);
    return res.json(error)
  }
};

module.exports=chat

