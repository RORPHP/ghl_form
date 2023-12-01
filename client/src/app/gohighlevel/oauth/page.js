"use client"
import Image from 'next/image'
import styles from '../../page.module.css'
import * as React from "react";

// import fs from 'fs';
// import path from 'path';


export default function OAuth() {

  const api_url = 'http://localhost:3001'

  // const dataFilePath = path.join(process.cwd(), 'json/token.json');
  // console.log(dataFilePath)
  const client_id = '656833bb18e41b56516d261a-lpkurjqq'
  const client_secret = '3e89da6d-5547-457a-86a2-1ad98e42f270'
  const user_type = 'Location'
  const redirect_uri = 'http://localhost:3000/gohighlevel/oauth'

  const [isLoaded,setIsLoaded] = React.useState(false)
  const [authCode,setAuthCode] = React.useState(null)
  const [refreshToken,setRefreshToken] = React.useState(null)

  React.useEffect(() => {
    setIsLoaded(true)
    if(isLoaded){
      let params = new URLSearchParams(window.location.search);
      let code = params.get("code"); // is the string "Jonathan"
      // console.log(code);
      setAuthCode(code)
      getAccessToken(code)
    }
  }, [isLoaded]);


  var getAccessToken = (code) => {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("client_id", client_id);
      urlencoded.append("client_secret", client_secret);
      urlencoded.append("grant_type", "authorization_code");
      urlencoded.append("code", code);
      urlencoded.append("redirect_uri", redirect_uri);
      urlencoded.append("user_type", user_type);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("https://services.leadconnectorhq.com/oauth/token", requestOptions)
      .then(response => response.text())
      .then((result) => {
          result = JSON.parse(result)

          if(result.hasOwnProperty('refresh_token')){
            const res = fetch(api_url+"/token/save", {
              method: "POST",
              body: JSON.stringify({
                token: result
              }),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(function(response){
              return response.json()
            }).then(function(data) {
              alert(data.response)
            });
          }else{
            alert(`${result.error}\n${result.error_description}`)
          }


      })
      .catch(error => console.log('error', error));

  }


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.js</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
