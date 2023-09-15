import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import useFetch from './useFetch';

const DownloadFile = () => {
    const { id } = useParams();
    const { data, isPending, error } = useFetch(`/files/${id}`);

    const handleDownload = async() => {

    }

    return (
        <div className="w-screen h-screen">
            <Navbar />
            <div className="bg-violet-500/70 w-100 h-300 mt-20 flex flex-col justify-center items-center py-10 mx-60 rounded-xl">
                { isPending && <div className="text-white">Loading...</div> }
                {/* { error && <div className="text-center text-sm bg-red-200 text-red-700 my-2 mx-2 px-7 py-5 w-full"> { error } </div> } */}
                <div className="text-white border border-white rounded-lg p-5 w-96 mb-5">
                    <p className="font-semibold text-xl mb-5">
                        Message:
                    </p>
                    { data && 
                        <p className="pl-5">
                            { data.message }
                        </p>
                    }
                </div>
                <div className="text-white border border-white rounded-lg p-5 w-96 mb-5">
                    <form 
                        onSubmit={handleDownload}
                        className=""
                    >
                    <div className="font-semibold">
                        File name goes here
                        <button>
                            Download File
                        </button>
                    </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default DownloadFile;