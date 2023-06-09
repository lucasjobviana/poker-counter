export const updateData = () => { 
   
    const token = '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';
    const owner = 'lucasjobviana';
    const repo = 'poker-counter';
    const path = 'data-pokerCounter.json';
    const sha = '325153c5e7f2ea0cf893c8fbaac7fd6730e96609';
    const headers = new Headers();
    const newContent = {pokerRounds: ["Job","Job","Job","job"]};
    
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    
    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        message: "Salvei round no data-pokerRounds",
        content: btoa(JSON.stringify(newContent)),
      })
    }

    fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${sha}`, requestOptions)
    .then(response => response.json())
    .then(data => {console.log('arquivo alterado');console.log(data)})
    .catch(error => { 
      console.log('Deu erro ao alterar: ',error);
    })
  
    
   
   
   };