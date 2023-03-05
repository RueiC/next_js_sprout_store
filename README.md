# Next.js｜SPROUT - 電商購物網站

Website Demo - https://next-js-sprout-store.vercel.app

<img width="800" alt="截圖 2023-02-19 23 02 24-min" src="https://user-images.githubusercontent.com/104335056/222966050-9e411d73-009c-4b0c-a6e1-1685c5de0d8f.png">

【專案目的】
1. 學習運用Next.js來完成SSG以及CSR
2. 運用Typescript來解決Javascript型別的問題
3. 學習API的串接
4. 學習CRUD的實作

【收穫】

在這個專案中收穫最多的是
1. 學習到了如何使用Context API來解決Components共享States的問題
2. 混用SSG以及CSR來解決不同問題。例如：整個專案以SSG作為基底，而在商品留言功能實作的部分使用CSR來做動態render
3. 使用Sanity後端服務來完成API的串接

【使用技術】

這項專案中使用了：Next.js / Typescript / Formik / Tailwind CSS / Sanity / Stripe / Yup

特別說明：
1. 使用Context API而不使用Zustand或者是Redux的原因在於，在初期規劃專案時，考量到元件的共用狀態尚未到非常複雜，Context API的特性適用其專案規模，且兼具開發速度
2. 使用Tailwind CSS開發，而不使用CSS Module、SASS或Styled Components的主要目的在於，避免掉因為style的命名而花費太多時間，加快專案的開發速度，專注在專案的開發過程
