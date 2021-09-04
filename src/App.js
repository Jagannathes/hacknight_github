import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
const { Octokit } = require('@octokit/rest');

function App() {
  let [name, setName] = useState(null);
  let [bio, setBio] = useState(null);
  let [avatar, setAvatar] = useState(null);
  let [currentUser, setcurrentUser] = useState(null);
  let [isthere, istherefunction] = useState(false);
  let [userRepos,setUserRepos]=useState([]);
  let userLocation="";
  let [userLanguages,setUserLanguages]=useState(["English"]);
  let [followers, setFollowers] = useState(0);
  let [following, setFollowing] = useState(0);
  let [reponumber, setrepos] = useState(0);
  let [day,setday] = useState('');
  let [blog,setblog] = useState();


  const octokit = new Octokit({
    auth: process.env.REACT_APP_PAT,

  });//Created a new octokit Object and authorized it using github PAT 

  const handleClick = function () {

    octokit.rest.users.getByUsername({
      username: currentUser,
    }).then((res) => {

      setName(res.data["name"]);
      setBio(res.data["bio"]);
      setAvatar(res.data["avatar_url"]);
      setFollowers(res.data["followers"]);
      setFollowing(res.data["following"]);
      setrepos(res.data["public_repos"]);
      setday(res.data["created_at"]);
      setblog(res.data["blog"]);
      userLocation=res.data["location"];
      console.log(res.data["location"]);    
      languageFinder(userLocation);
      
    });//handle the Button Click and get the user data from the github API using the currentusername


    octokit.rest.repos.listForUser({
      username:currentUser,
    }).then((res)=>{
     
      res.data.forEach((repo)=>{
        
        let temp_repo={
          repo_name:repo.name,
          repo_description:repo.description,
          repo_url:repo.html_url,
          repo_starcount:repo.stargazers_count,

        }
        setUserRepos(userRepos=>[...userRepos,temp_repo]);
        
      })    
    })// Fetch the data of the repositories of the user and store it in an Array of Javascript objects
  }
  return (
   <div>testt</div> 
  );
}

export default App;