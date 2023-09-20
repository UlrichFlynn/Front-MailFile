import { useState } from "react";

const FileItem = ({ files, id, hasPassword }) => {
    const BASE_URL = "http://localhost:7020/api";
    const abortController = new AbortController();
    let [path, setPath] = useState("");
    const [password, setPassword] = useState("");
    const [showPasswordField, setShowPasswordField] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = (e, link) => {
        setPath(() => path = link.split('path=')[1]);
        if (hasPassword) {
            setShowPasswordField(true);
        }
        else {
            handleSubmit(e);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsPending(true);
            let data = { id, password, path };
            const response = await fetch(`${BASE_URL}/files/download`, {
                signal: abortController.signal,
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.type === "error") {
                setSuccessMsg(null);
                setError(result.message);
            }
            else {
                setPassword("");
                setSuccessMsg(result.message);
                setError(null);
            }
            setIsPending(false);

        }
        catch (error) {
            setSuccessMsg(null);
            setIsPending(false);
            setError("An error has occured. Please try again later");
        }
    }

    return (
        <div>
            {
                files.map((file, index) => {
                    return (
                        <div className="mb-5" key={file._id}>
                            <p className="text-center font-semibold"> {file.name} </p>
                            <p className="underline cursor-pointer" onClick={(e) => handleClick(e, file.link)}>
                                {file.link}
                            </p>
                        </div>
                    )
                })
            }
            { error && <div className="text-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> { error } </div> }
            { successMsg && <div className="text-center text-sm bg-green-200 text-green-800 my-2 mx-2 px-7 py-5 w-full"> { successMsg } </div> }
            { isPending && <div className="text-center">Downloading...</div> }
            {
                showPasswordField &&
                <div className="p-5 w-96 mb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-fuchsia-500"
                                id="password"
                                type="password"
                                placeholder='Password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-violet-500 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                { !isPending && <div>Download</div> }
                                { isPending && <div>Downloading...</div> }
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}

export default FileItem;