import Loading from './Loading';
import closeIcon from '../../images/closeIcon.png'
import { useState, useEffect } from 'react';
import { manualRegister } from '../backend/fetchData';

interface RegistrationFormProps {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface UserFormData {
    username: string;
    password: string;
    confirmPassword: string;
    profileImage?: File;
    role: string;
    jobTitle?: string;
    qualification?: string;
    qualificationInstitution?: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
}

export interface ChildrenFormData {
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    parentUsername: string;
    allergies?: string;
    authorizedPersons?: string;
    emergencyContact1Name: string;
    emergencyContact1Number: string;
    emergencyContact2Name: string;
    emergencyContact2Number: string;
}

function RegistrationForm({ option, setOption }: RegistrationFormProps) {
    // Initialize state based on option
    const [formData, setFormData] = useState<UserFormData | ChildrenFormData>(
        option === "user"
            ? {
                username: "",
                password: "",
                confirmPassword: "",
                role: "",
                jobTitle: "",
                qualification: "",
                qualificationInstitution: "",
                emergencyContactName: "",
                emergencyContactNumber: "",
            }
            : {
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                parentUsername: "",
                allergies: "",
                authorizedPersons: "",
                emergencyContact1Name: "",
                emergencyContact1Number: "",
                emergencyContact2Name: "",
                emergencyContact2Number: "",
            }
    );
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
                    username: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                    jobTitle: "",
                    qualification: "",
                    qualificationInstitution: "",
                    emergencyContactName: "",
                    emergencyContactNumber: "",
                }
                : {
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    parentUsername: "",
                    allergies: "",
                    authorizedPersons: "",
                    emergencyContact1Name: "",
                    emergencyContact1Number: "",
                    emergencyContact2Name: "",
                    emergencyContact2Number: "",
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

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files
        if (files) {
            setFormData(prev => ({ ...prev, profileImage: files[0] }));
        }
    }

    function handleAddAnother() {
        setEntries(prev => [...prev, formData]);
        setFormData(
            option === "user"
                ? {
                    username: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                    jobTitle: "",
                    qualification: "",
                    qualificationInstitution: "",
                    emergencyContactName: "",
                    emergencyContactNumber: "",
                }
                : {
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    parentUsername: "",
                    allergies: "",
                    authorizedPersons: "",
                    emergencyContact1Name: "",
                    emergencyContact1Number: "",
                    emergencyContact2Name: "",
                    emergencyContact2Number: "",
                }
        );
    }

    // Send data
    async function handleFinish() {
        setLoading(true)
        setEntries(prev => [...prev, formData]);
        console.log("Final Data Sent:", await manualRegister([...entries, formData]));
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
                        <label>Role: 
                            <select name="role" onChange={handleChange} value={(formData as UserFormData).role || ''} required>
                                <option value="">Select Role</option>
                                <option value="Family">Family</option>
                                <option value="educator">Educator</option>
                                <option value="admin">Admin</option>
                            </select>
                        </label>
                        <label>Password: <input type="password" name="password" onChange={handleChange} value={(formData as UserFormData).password || ''} required /></label>
                        <label>Confirm Password: <input type="password" name="confirmPassword" onChange={handleChange} value={(formData as UserFormData).confirmPassword || ''} required /></label>
                        <label>Profile Image (Optional): <input type="file" accept="image/*" onChange={handleFileChange} /></label>
                        <label>Job Title: <input type="text" name="jobTitle" onChange={handleChange} value={(formData as UserFormData).jobTitle || ''} required /></label>
                        <label>Qualification (Optional): <input type="text" name="qualification" onChange={handleChange} value={(formData as UserFormData).qualification || ''} /></label>
                        <label>Qualification Institution: <input type="text" name="qualificationInstitution" onChange={handleChange} value={(formData as UserFormData).qualificationInstitution || ''} required={!!(formData as UserFormData).qualification} /></label>
                        <label>Emergency Contact Name: <input type="text" name="emergencyContactName" onChange={handleChange} value={(formData as UserFormData).emergencyContactName || ''} required /></label>
                        <label>Emergency Contact Number: <input type="tel" name="emergencyContactNumber" onChange={handleChange} value={(formData as UserFormData).emergencyContactNumber || ''} required /></label>

                        <button type="button" onClick={handleAddAnother}>Add Another</button>
                        <button type="button" onClick={handleFinish}>Finish</button>
                    </form>
                ) : (
                    <form className='registration-form'>
                        <h2>Children Registration</h2>
                        <label>First Name: <input type="text" name="firstName" onChange={handleChange} value={(formData as ChildrenFormData).firstName || ''} required /></label>
                        <label>Last Name: <input type="text" name="lastName" onChange={handleChange} value={(formData as ChildrenFormData).lastName || ''} required /></label>
                        <label>Date of Birth: <input type="date" name="dateOfBirth" onChange={handleChange} value={(formData as ChildrenFormData).dateOfBirth || ''} required /></label>
                        <label>Username of Parent: <input type="text" name="parentUsername" onChange={handleChange} value={(formData as ChildrenFormData).parentUsername || ''} required /></label>
                        <label>Allergies (Optional): <input type="text" name="allergies" onChange={handleChange} value={(formData as ChildrenFormData).allergies || ''} /></label>
                        <label>Authorized Persons (Optional): <input type="text" name="authorizedPersons" onChange={handleChange} value={(formData as ChildrenFormData).authorizedPersons || ''} /></label>
                        <label>Emergency Contact 1 Name: <input type="text" name="emergencyContact1Name" onChange={handleChange} value={(formData as ChildrenFormData).emergencyContact1Name || ''} required /></label>
                        <label>Emergency Contact 1 Number: <input type="tel" name="emergencyContact1Number" onChange={handleChange} value={(formData as ChildrenFormData).emergencyContact1Number || ''} required /></label>

                        <button type="button" onClick={handleAddAnother}>Add Another</button>
                        <button type="button" onClick={handleFinish}>Finish</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default RegistrationForm;
