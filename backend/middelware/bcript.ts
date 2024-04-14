import bcrypt from 'bcrypt'

export const hashPassword = async (pass:string)=>{
    const hash = await bcrypt.hash(pass, 10)
    return hash
} 

export const comparePassword = async (pass: string, hash:string)=>{
    const isMatch = await bcrypt.compare(pass, hash)
    return isMatch
}