
const getSha = async () => {
  const owner = 'lucasjobviana';
  const repo = 'poker-counter';
  const path = 'data-pokerCounter.json';
  const branchJson = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`);
  const branchData = await branchJson.json();
  const branchSha = branchData.object.sha;
  const commitJson = await fetch(`https://api.github.com/repos/lucasjobviana/poker-counter/commits/${branchSha}`);
  const commitData = await commitJson.json();
  const treeSha = commitData.commit.tree.sha;
  const treeJson = await fetch(`https://api.github.com/repos/lucasjobviana/poker-counter/git/trees/${treeSha}?recursive=1`);
  const treeData = await treeJson.json();
  const fileObject = treeData.tree.find(obj => obj.path === path);
  const fileSha = fileObject.sha;
  //console.log(branchData, commitData, treeData, fileObject, fileSha)
  console.log('fim do getCha')
  return fileSha;
}


export const updateData = async (rounds = [["j","o","o","b"]]) => { 
    const a = await getSha();
    console.log(a)
    console.log('https://api.github.com/repos/lucasjobviana/poker-counter/contents/data-pokerCounter.json')
    
    const token = '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';
    //const token = localStorage.getItem('tokenPokerData');
    const owner = 'lucasjobviana';
    const repo = 'poker-counter';
    const path = 'data-pokerCounter.json';
    const sha = a;
    const headers = new Headers();
    const newContent = {pokerRounds: rounds};
    
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    
    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        message: "Salvei round no data-pokerRounds",
        content: btoa(JSON.stringify(newContent)),
        sha: sha
      })
    }

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, requestOptions)
    .then(response => response.json())
    .then(data => {console.log('arquivo alterado');console.log(data)})
    .catch(error => { 
      console.log('Deu erro ao alterar: ',error);
    })
    
  
    
   
   
   };
