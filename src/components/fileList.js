import Navbar from './navbar';
import useFetch from './useFetch';
import { Link, useLocation } from "react-router-dom";

const FileList = () => {
    const userToken = localStorage.getItem("token");
    const { data, isPending, error } = useFetch('/files', userToken);

    const location = useLocation();
    let user = location.state.user;

    return (
        <div>
            <Navbar email={"Admin: " + user.email} />
            {error && <div className="text-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> {error} </div>}
            {isPending && <div className="text-white">Loading...</div>}
            <div className="text-white cursor-pointer ml-5 my-5 p-3 bg-violet-500/60 hover:bg-violet-500 max-w-fit rounded">
                <Link to="/users/new" state={user}>
                    <p>Create account</p>
                </Link>
            </div>
            {
                !isPending &&
                <div>
                    <table className="table-auto w-screen max-h-fit bg-gray-500/10">
                        <thead className="text-xl border border-black">
                            <tr>
                                <th>Sender</th>
                                <th>Recipient</th>
                                <th>Message</th>
                                <th>File Name</th>
                                <th>Number Of Downloads</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 &&
                                data.map((file, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{file.sender}</td>
                                            <td>{file.recipient}</td>
                                            <td>{file.message}</td>
                                            <td>{file.fileName}</td>
                                            <td>{file.numberOfDownloads}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}

export default FileList;