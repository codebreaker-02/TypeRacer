
//Palindrome Function
function isPalindrome(str){
    let n = str.length
    for(let i=0;i<n;i++)
        if(str[i]!=str[n-i-1])
            return false

    return true;
}


//Prime Number
function isPrime(num){
    if(num==1)
        return false;
    for(let i=2;i<=num/2;i++){
        if(num%i==0)
            return false;
    }
    return true;
}

//Max sum subarray of size k
//BruteForce 
function maxSubarrayOfSizeK(arr, k){

}

let str = "nitin"
let num = 19
const arr = ['1']
console.log(isPalindrome(str))
console.log(isPrime(num))