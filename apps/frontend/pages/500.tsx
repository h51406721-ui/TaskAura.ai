import dynamic from "next/dynamic";
const ErrorContent = dynamic(() => Promise.resolve(() => <h1>500 - Server Error</h1>), { ssr: false });
export default ErrorContent;
