const FileNameItem = ({ names }) => {
    return (
        <div>
            {
                names.map((name, index) => {
                    return (
                    <div className="border border-violet-500 rounded my-1 mx-2 p-2 bg-gray-500/30" key={index}>
                        { name }
                    </div>)
                })
            }
        </div>
    );
}
 
export default FileNameItem;