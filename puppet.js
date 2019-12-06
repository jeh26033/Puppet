const puppeteer = require('puppeteer');
const prompts = require('prompts');
const chalk = require('chalk');

'use strict';

const fs = require( 'fs' );
const https = require( 'https' );



async function puppet(){
	console.log(chalk.green(`


 ______                               
(_____ |                          _   
 _____) _   _ ____  ____  _____ _| |_ 
|  ____| | | |  _ ||  _ || ___ (_   _)
| |    | |_| | |_| | |_| | ____| | |_ 
|_|    |____/|  __/|  __/|_____) |__ )
             |_|   |_|                
        
--instructions for use--
	
	1. don't use capitals, or hyphens. f150 for example.
	2. works on ford, jeep, ram, chrysler and dodge right now
	3. before you start, have a folder made in the images fold of the model. 
	   folder name needs to match model
	4. hit ctrl+c to exit out of the prompt early

	BE AWARE- true to it's name, this program will open a browser and do some stuff, don't be alarmed!

     `));
	let questions = [
	    {
	        type: 'text',
	        name: 'make',
	        message: 'Enter a Make For Scrappin',
	        // validate: URL => URL_REGEX.test(URL) === false ? 'please enter valid url' : true
	    },
	    {
	        type: 'text',
	        name: 'model',
	        message: 'Enter a Model'
	    }
	];
	let response = await prompts(questions);
	const options = {
		make:[`${response.make}`],
		model:[`${response.model}`],
		large:[`${response.large}`]
	}

	if (options.make == 'ford') {
		ford(options.model)
	}else if (options.make=='jeep') {
		jeep(options.model)
	}else if (options.make=='ram') {
		ram(options.model)
	}else if (options.make=='dodge') {
		dodge(options.model)
	}else if (options.make=='chrysler') {
		chrysler(options.model)
	}

	else{
		wam()
	}
}

function wam(){
	console.log(`womp womp`)
}

/* ============================================================
    FORD!
============================================================ */
async function ford(model) {

    const browser = await puppeteer.launch({
    	headless: false,
	    defaultViewport: null,
	    args: ['--window-size=1920, 1080']
	    });
    const page    = await browser.newPage();
    let result;
    let newUrl;
    let fullWidth = /(wid).*?(?=&)/gi;
    let fullHeight = /(hei).*?(?=&|$)/gi;    
    await page.goto(`https://www.ford.com/${model}`);
    let url = page.url();
    await page.goto(`${url}/gallery`);
   	await page.evaluate(scrollToBottom);
	await page.waitFor(3000);
    const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );

    for ( let i = 0; i < images.length; i++ )
    {
    	try {
    		//skips little jelly bean images
    		if (images[i].includes('assetsadobe')) {
	    		newUrl = images[i].replace(fullWidth,'wid=1920').replace(fullHeight, 'hei=1080')
		        result = await download( newUrl, `images/ford/${model}/image-${i}.png` );
		        if ( result === true )
		        {
		        	console.log(chalk.magenta('Success:', chalk.green(images[i]), 'has been downloaded successfully.' ));
		        }
		    }
		}catch(error) {
	        console.log(chalk.red('Error:', images[i], 'was not downloaded.'));
	        console.error( result );
        }
    }
    await browser.close();
    console.log(`Done! Downloaded ${images.length} images`)
};


/* ============================================================
    JEEP!
============================================================ */
async function jeep(model) {
    const browser = await puppeteer.launch({
    	headless: false,
	    defaultViewport: null,
	    args: ['--window-size=1920, 1080']
	    });
    const page = await browser.newPage();
    let result;
    await page.goto(`https://www.jeep.com/${model}/gallery.html`, {
    	waitUntil: 'networkidle2'
    });
   	await page.evaluate(scrollToBottom);
	await page.waitFor(3000);

    const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );
    console.log(images)
    for ( let i = 0; i < images.length; i++ )
    {
    	try {
    		if (images[i].includes('gallery')) {
		        result = await download( images[i], `images/jeep/${model}/image-${i}.png` );
		        if ( result === true )
		        {
		        	console.log(chalk.magenta('Success:', chalk.green(images[i]), 'has been downloaded successfully.' ));
		        }
		    }
		}catch(error) {
	        console.log(chalk.red('Error:', images[i], 'was not downloaded.'));
	        console.error( result );
        }
    }

    await browser.close();
    console.log(`Done! Downloaded ${images.length} images`)
};

/* ============================================================
    Chrysler!
============================================================ */
async function chrysler(model) {
    const browser = await puppeteer.launch({
    	headless: false,
	    defaultViewport: null,
	    args: ['--window-size=1920, 1080']
	    });
    const page = await browser.newPage();
    let result;
    await page.goto(`https://www.chrysler.com/${model}/gallery.html`, {
    	waitUntil: 'networkidle2'
    });
   	await page.evaluate(scrollToBottom);
	await page.waitFor(3000);

    const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );
    console.log(images)
    for ( let i = 0; i < images.length; i++ )
    {
    	try {
    		if (images[i].includes('gallery')) {
		        result = await download( images[i], `images/chrysler/${model}/image-${i}.png` );
		        if ( result === true )
		        {
		        	console.log(chalk.magenta('Success:', chalk.green(images[i]), 'has been downloaded successfully.' ));
		        }
		    }
		}catch(error) {
	        console.log(chalk.red('Error:', images[i], 'was not downloaded.'));
	        console.error( result );
        }
    }

    await browser.close();
    console.log(`Done! Downloaded ${images.length} images`)
};
/* ============================================================
    Ram Trucks!
============================================================ */
async function ram(model) {
    const browser = await puppeteer.launch({
    	headless: false,
	    defaultViewport: null,
	    args: ['--window-size=1920, 1080']
	    });
    const page = await browser.newPage();
    let result;
    await page.goto(`https://www.ramtrucks.com/${model}/gallery.html`, {
    	waitUntil: 'networkidle2'
    });
   	await page.evaluate(scrollToBottom);
	await page.waitFor(3000);

    const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );
    console.log(images)
    for ( let i = 0; i < images.length; i++ )
    {
    	try {
    		if (images[i].includes('gallery')) {
		        result = await download( images[i], `images/ramtrucks/${model}/image-${i}.png` );
		        if ( result === true )
		        {
		        	console.log(chalk.magenta('Success:', chalk.green(images[i]), 'has been downloaded successfully.' ));
		        }
		    }
		}catch(error) {
	        console.log(chalk.red('Error:', images[i], 'was not downloaded.'));
	        console.error( result );
        }
    }

    await browser.close();
    console.log(`Done! Downloaded ${images.length} images`)
};

/* ============================================================
    Dodge!
============================================================ */
async function dodge(model) {
    const browser = await puppeteer.launch({
    	headless: false,
	    defaultViewport: null,
	    args: ['--window-size=1920, 1080']
	    });
    const page = await browser.newPage();
    let result;
    await page.goto(`https://www.dodge.com/${model}/gallery.html`, {
    	waitUntil: 'networkidle2'
    });
   	await page.evaluate(scrollToBottom);
	await page.waitFor(3000);

    const images = await page.evaluate( () => Array.from( document.images, e => e.src ) );
    console.log(images)
    for ( let i = 0; i < images.length; i++ )
    {
    	try {
    		if (images[i].includes('gallery')) {
		        result = await download( images[i], `images/dodge/${model}/image-${i}.png` );
		        if ( result === true )
		        {
		        	console.log(chalk.magenta('Success:', chalk.green(images[i]), 'has been downloaded successfully.' ));
		        }
		    }
		}catch(error) {
	        console.log(chalk.red('Error:', images[i], 'was not downloaded.'));
	        console.error( result );
        }
    }

    await browser.close();
    console.log(`Done! Downloaded ${images.length} images`)
};
/* ============================================================
    Promise-Based Download Function
============================================================ */

const download  = ( url, destination ) => new Promise( ( resolve, reject ) =>
{
    const file = fs.createWriteStream( destination );
    https.get( url, response =>
    {
        response.pipe( file );
        file.on( 'finish', () =>
        {
            file.close( resolve( true ) );
        });
    })
    .on( 'error', error =>
    {
        fs.unlink( destination );
        reject( error.message );
    });
});

/* ============================================================
    Scroll to bottom to get lazy loaded images
============================================================ */
async function scrollToBottom() {
  await new Promise(resolve => {
    const distance = 100; // should be less than or equal to window.innerHeight
    const delay = 100;
    const timer = setInterval(() => {
      document.scrollingElement.scrollBy(0, distance);
      if (document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight) {
        clearInterval(timer);
        resolve();
      }
    }, delay);
  });
}
puppet();


