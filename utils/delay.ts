export const delay=(max=2500)=>{
  const randomDelatyTime = Math.floor(Math.random()*(max-500+1))
  return new Promise((resolve)=>setTimeout(resolve,randomDelatyTime))
}