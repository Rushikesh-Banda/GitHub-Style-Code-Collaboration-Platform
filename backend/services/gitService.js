import simpleGit from "simple-git";

const git=simpleGit();

export const initRepo=async(path)=>{

await git.init(path);

};

export const commitChanges=async(path,message)=>{

await git.cwd(path);
await git.add(".");
await git.commit(message);

};