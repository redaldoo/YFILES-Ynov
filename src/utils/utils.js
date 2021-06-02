import Axios from 'axios'
export default function Utils(){
const CreateFolderModal = (props) => {
    const [folderName, setFolderName] = useState('')
    const [folderNameErr, setFolderNameErr] = useState('')
    const onChangeFolderName = (e) => {
        e.preventDefault();
        setFolderName(e.target.value)
    }
    const onSubmitFolderName = async (e) => {
        e.preventDefault()
        const UID = localStorage.getItem('uid')
        
        if(!isEmpty(folderName)){
            try {
                // let formData = new FormData();    //formdata object
                // formData.append('folderName', 'test');
                await Axios.post(`http://localhost:5001/ynovpfa/europe-west3/api/v1/folders/folder/${UID}`,{folderName : folderName})
                .then((res)=> {
                    window.alert(`New folder has been created successfully, folder ID : ${res.data.documentID} `)
                    window.location.href = "/dashboard"
                })
                .catch((err)=> {
                    console.log(err.message)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
            setFolderNameErr('Dude, folder name must not be empty !')
        }
    }}}