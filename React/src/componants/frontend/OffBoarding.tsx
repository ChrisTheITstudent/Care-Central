import { useState, useEffect } from "react";
import { offboarding } from "../backend/fetchData";
import Loading from "./Loading";
import closeIcon from '../../images/closeIcon.png'

interface OffboardingProps {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface UserFormData {
    username: string;
}

export interface ChildrenFormData {
    firstName: string;
    lastName: string;
}

function OffBoarding({ option, setOption }: OffboardingProps) {
    const [formData, setFormData] = useState<UserFormData | ChildrenFormData>(
        option === "user"
            ? {
                username: ""
            }
            : {
                firstName: "",
                lastName: ""
            }
    )
    const [entries, setEntries] = useState<Array<UserFormData | ChildrenFormData>>([]);
    const [closeButtonClass, setCloseButtonClass] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    // Set inital close button class
    useEffect(() => {
        switch (option) {
            case "user":
                setCloseButtonClass("close-user")
                break;
            case "children":
                setCloseButtonClass("close-children")
                break;
        
            default:
                break;
        }
    }, [option])
    
    // Reset formData when option changes
    useEffect(() => {
        setFormData(
            option === "user"
                ? {
                    username: ""
                }
                : {
                    firstName: "",
                    lastName: ""
                }
        );
    }, [option]);
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        if (option === "user") {
            setFormData(prev => ({ ...prev, [name]: value }));
            setCloseButtonClass("close-user")
        } else if (option === "children") {
            setFormData(prev => ({ ...prev, [name]: value }));
            setCloseButtonClass("close-children")
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            setCloseButtonClass("")
        }
    }

    function handleAddAnother() {
        setEntries(prev => [...prev, formData]);
        setFormData(
            option === "user"
                ? {
                    username: ""
                }
                : {
                    firstName: "",
                    lastName: ""
                }
        );
    }

    // Send data
    async function handleFinish() {
        setLoading(true)
        setEntries(prev => [...prev, formData]);
        console.log("Final Data Sent:", await offboarding([...entries, formData]));
        setOption(null);
        setLoading(false)
    }

    return (
        <>{loading && <Loading loadingText={"Sending data..."} />}
            <div className='registration-container'>
                <img src={closeIcon} alt='Close' className={closeButtonClass} onClick={() => setOption(null)} />

                {option === "user" ? (
                    <form className='registration-form'>
                        <h2>User Registration</h2>
                        <label>Username: <input type="text" name="username" onChange={handleChange} value={(formData as UserFormData).username || ''} required /></label>

                        <button type="button" onClick={handleAddAnother}>Add Another</button>
                        <button type="button" onClick={handleFinish}>Finish</button>
                    </form>
                ) : (
                    <form className='registration-form'>
                        <h2>Children Registration</h2>
                        <label>First Name: <input type="text" name="firstName" onChange={handleChange} value={(formData as ChildrenFormData).firstName || ''} required /></label>
                        <label>Last Name: <input type="text" name="lastName" onChange={handleChange} value={(formData as ChildrenFormData).lastName || ''} required /></label>

                        <button type="button" onClick={handleAddAnother}>Add Another</button>
                        <button type="button" onClick={handleFinish}>Finish</button>
                    </form>
                )}
            </div>
        </>
    )
}

export default OffBoarding