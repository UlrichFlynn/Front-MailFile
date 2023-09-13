import { useState } from 'react';
import Navbar from './navbar';
import FileNameItem from './fileNameItem';

const Home = () => {
    // const userToken = localStorage.getItem("token");
    const [data, setData] = useState({
        recipient: "",
        message: "",
        password: ""
    });
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    // const handleFileChange = (e) => {
    //     setFiles([...files, ...e.target.files]);
    //     let selectedFiles = e.target.files;
    //     let size = selectedFiles.length;
    //     for(let i = 0; i < size; i++) {
    //       setFileNames([...fileNames, selectedFiles[i].name]);
    //     }
    // };
    const handleFileChange = (e) => {
      let selectedFiles = e.target.files;
      let newFileNames = [...fileNames]; // Copie des noms de fichiers existants dans un nouveau tableau pour eviter de perdre lors du chargment 
    
      for (let i = 0; i < selectedFiles.length; i++) {
        newFileNames.push(selectedFiles[i].name); // Ajout des nom des nouveaux fichiers
      }
    
      setFiles([...files, ...selectedFiles]);
      setFileNames(newFileNames); // ici c'est la mise a jour des fichiers
    };
    
    const handleCheckboxChange = (event) => {
      setCheckedItems({
        ...checkedItems,
        [event.target.name]: event.target.checked,
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let file of files) {
          formData.append("files", file);
        }
    }

    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="bg-violet-500/70 w-100 h-300 mt-20 flex justify-center items-center py-10 mx-60 rounded-xl">

              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-6 text-center">Send Files</h2>
                { error && <div className="align-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> { error } </div> }
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="files">
                    Files
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500 cursor-pointer"
                    id="files"
                    type="file"
                    placeholder='Select files'
                    onChange={handleFileChange}
                    multiple
                    required
                  />
                  {
                    fileNames.length > 0 &&  <FileNameItem names={fileNames} />
                  }
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                    Recipient
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
                    id="recipient"
                    type="email"
                    placeholder='Recipient email'
                    name='recipient'
                    value={ data.recipient }
                    onChange={handleChange}
                    required
                  />
                </div>

                <label>
                    <input
                    type="checkbox"
                    name="message"
                    checked={checkedItems.message}
                    onChange={handleCheckboxChange}
                    />
                    Add a message
                </label>
                {
                    checkedItems.message && 
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
                        id="message"
                        type="text"
                        placeholder='Message'
                        name='message'
                        value={ data.message }
                        onChange={handleChange}
                      />
                    </div>
                }
                <br />

                <label>
                    <input
                    type="checkbox"
                    name="password"
                    checked={checkedItems.password}
                    onChange={handleCheckboxChange}
                    />
                    Add a password
                </label>
                { 
                    checkedItems.password && 
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
                        id="password"
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={ data.password }
                        onChange={handleChange}
                    />
                    </div>
                }
                <br />

                <div className="flex items-center justify-center">
                  <button
                    className="bg-violet-500 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    { !isPending && <div>Send</div> }
                    { isPending && <div>Sending...</div> }
                  </button>
                </div>
              </form>
            </div>
        </div>
    );
}
 
export default Home;