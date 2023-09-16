const button = document.querySelector('button')
const progress = document.querySelector('progress')

button.onclick = async () => {
    const [handle] = await showOpenFilePicker()
    
    const file = await handle.getFile()
    const formData = new FormData()
    formData.append('file', file)
    
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload', true)
    xhr.upload.onprogress = e => {
        if (!e.lengthComputable) return
        if(progress.hidden) progress.hidden = false
        
        const percentage = (e.loaded / e.total) * 100
        progress.value = percentage

        if(percentage == 100) {
            setTimeout(() => {
                progress.hidden = true
                setTimeout(() => {
                    alert('Upload has finished!')
                }, 250)
            }, 250)
        }
    }
    xhr.send(formData)
}