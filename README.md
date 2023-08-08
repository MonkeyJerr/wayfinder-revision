# Wayfinder Read-Only

![React](https://img.shields.io/badge/React-v18.2+-61DAFB?logo=react)
![Node](https://img.shields.io/badge/Node-v16.8+-339933?logo=node.js&logoColor=white)
![Next](https://img.shields.io/badge/Next-v13.x-black?logo=next.js&logoColor=black)



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

Write about npm install and python

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

There are two versions of the calendar. One is to show channel data on QA and one is to show channel data on Prod.
- [QA Deployed Site](http://wayfinder-qa-bucket.s3-website-us-east-1.amazonaws.com/)
- [Prod Deployed Site](http://wayfinder-prod-bucket.s3-website-us-east-1.amazonaws.com/)

They are both deployed using AWS S3 buckets. The QA bucket lives on the `i-aws-sports-video-qa` AWS account and is called `wayfinder-qa-bucket`. The Prod bucket lives on the `i-aws-sports-video` AWS account and is called `wayfinder-prod-bucket`.

If you are trying to upload to the bucket:

- Delete the out folder first. Then run the following:
```bash
# if you are trying to upload to the QA bucket
NODE_ENV=test npx next build

# if you are trying to upload to the Prod bucket
NODE_ENV=prod npx next build

#then, if you want to see what is contained in the out folder, run the following to run it locally
cd out
python3 -m http.server

```

You can then go to the desired bucket and then drag the contents inside the out folder into the bucket (don't put the entire out folder in there... drag the contents out of it)