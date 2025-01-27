document.addEventListener("DOMContentLoaded",function(){
    const searchButton=document.getElementById("search-btn");
    const usernameInput=document.getElementById("user-input");
    const statsContainer=document.querySelector(".stats-container");
    const easyProjectCircle=document.querySelector(".easy-progress");
    const mediumProjectCircle=document.querySelector(".medium-progress");
    const hardProjectCircle=document.querySelector(".hard-progress");
    const easyLabel=document.getElementById("easy-label");
    const mediumLabel=document.getElementById("medium-label");
    const hardLabel=document.getElementById("hard-label");
    const cardStatsContainer=document.querySelector(".stats-cards");

    //return true or false based on regex
    function validateUsername(username){
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
        const regex=/^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching=regex.test(username);
        if(!isMatching){
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        const url=`https://leetcode-stats-api.herokuapp.com/${username}`
        try{
            searchButton.textContent="Searching...";
            searchButton.disabled=true;
            const response=await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the User details");
            }
            const data=await response.json();
            console.log("Login data ",data);
            displayUserData(data);
        }
        catch(error){
            statsContainer.innerHTML=`<p>No Data Found</p>`
        }
        finally{
            searchButton.textContent="Search";
            searchButton.disabled=false;
        }
    }
    
    function updateProgress(solved,total,label,circle){
        const progressDegree=(solved/total)*100;
        circle.style.setProperty("--progress-degree",`${progressDegree}%`);
        label.textContent=`${solved}/${total}`;
    }

    function displayUserData(data){
        const totalLeetQues=data.totalQuestions;
        const totalSolvedQues=data.totalSolved;
        const totalEasyQues=data.totalEasy;
        const totalMediumQues=data.totalMedium;
        const totalHardQues=data.totalHard;
        const easySolvedQues=data.easySolved;
        const mediumSolvedQues=data.mediumSolved;
        const hardSolvedQues=data.hardSolved;

        updateProgress(easySolvedQues,totalEasyQues,easyLabel,easyProjectCircle);
        updateProgress(mediumSolvedQues,totalMediumQues,mediumLabel,mediumProjectCircle);
        updateProgress(hardSolvedQues,totalHardQues,hardLabel,hardProjectCircle);
    }
    searchButton.addEventListener('click',function(){
        const username=usernameInput.value;
        console.log("login username",username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})