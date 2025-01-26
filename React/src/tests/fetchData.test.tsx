import * as fetchData from '../componants/backend/fetchData';
import { User } from '../classes';
import { waitFor } from '@testing-library/react';

global.fetch = jest.fn(() => {
    return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({
            id: 1,
            username: "test",
            role: "testRole",
            profileImage: "testImage",
            room: "testRoom",
            child: {
                id: 1,
                name: "testName",
                dob: "testDob",
                attending: true
            }
        })
    } as Response)
})

beforeEach(() => {
    (fetch as jest.Mock).mockClear()
})

describe('fetchData', () => {
    test('verifies correct password', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    status: "OK",
                    id: 1,
                    username: "test",
                    role: "testRole",
                    profileImage: "testImage",
                    room: "testRoom",
                    child: {
                        id: 1,
                        name: "testName",
                        dob: "testDob",
                        attending: true
                    }
                })
            } as Response)
        })

        waitFor(async () => {
            expect(fetchData.verifyPassword("TestUser", "TestPassword")).toBe(true)
        })
    })
    test('verifies incorrect password', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    status: "FAILED",
                    id: 1,
                    username: "test",
                    role: "testRole",
                    profileImage: "testImage",
                    room: "testRoom",
                    child: {
                        id: 1,
                        name: "testName",
                        dob: "testDob",
                        attending: true
                    }
                })
            } as Response)
        })

        waitFor(async () => {
            expect(fetchData.verifyPassword("TestUser", "TestPassword")).rejects.toBe(false)
        })
    })

    test('verifyPassword handles errors in fetching', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject("error")
        })

        waitFor( async () => {
            await expect(fetchData.verifyPassword("testUser", "testPassword")).rejects.toEqual("error")
        })
    })

    test('createUser', async () => {
        waitFor( async () => {
            const user: User = await fetchData.createUser("test")

            expect(user.getUsername).toBe("test")
            expect(fetch).toHaveBeenCalledTimes(2)
        })
    })

    test('toggleChildIsAttending', async () => {
        waitFor( async () => {
            const response = await fetchData.toggleChildIsAttending(1)

            expect(response).toBe("test")
            expect(fetch).toHaveBeenCalledTimes(1)
        })
    })

    test('createUser error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject("error")
        })

        waitFor( async () => {
            await expect(fetchData.createUser("test")).rejects.toEqual("error")
        })
    })

    test('toggleChildIsAttending error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject("error")
        })

        waitFor( async () => {
            await expect(fetchData.toggleChildIsAttending(1)).rejects.toEqual("error")
        })
    })

    test('createUser fetches user and children data correctly', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        role: "testRole",
                        profileImage: "testImage",
                        room: "testRoom",
                        getChildren: () => Promise.resolve({
                            1: {
                                id: 1,
                                firstName: "testName",
                                dob: "testDob",
                                attending: true,
                                getFirstName: () => "testName"
                            }
                        })
                    })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        1: {
                            id: 1,
                            firstName: "testName",
                            dob: "testDob",
                            attending: true
                        }
                    })
                } as Response)
            }
            return Promise.reject("error")
        })

        const user: User = await fetchData.createUser("test")

        expect(user.getUsername()).toBe("test")
        expect(user.getRole()).toBe("testRole")
        expect(user.getProfileImage()).toBe("testImage")
        expect(user.getRoom()).toBe("testRoom")
        expect(user.getChildren()?.length).toBe(1)
        expect(user.getChildren()?.[0].getFirstName()).toBe("testName")
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('createUser handles fetch error', async () => {
        global.fetch = jest.fn((url) => {
            return Promise.reject("error")
        })

        await expect(fetchData.createUser("test")).rejects.toEqual("error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test('createUser resolves correctly when user data is fetched successfully', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        role: "testRole",
                        profileImage: "testImage",
                        room: "testRoom"
                    })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        1: {
                            id: 1,
                            firstName: "testName",
                            dob: "testDob",
                            attending: true
                        }
                    })
                } as Response)
            }
            return Promise.reject("error")
        })

        const user: User = await fetchData.createUser("test")

        expect(user.getUsername()).toBe("test")
        expect(user.getRole()).toBe("testRole")
        expect(user.getProfileImage()).toBe("testImage")
        expect(user.getRoom()).toBe("testRoom")
        expect(user.getChildren()?.length).toBe(1)
        expect(user.getChildren()?.[0].getFirstName()).toBe("testName")
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('createUser rejects with an error when fetch fails', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject(new Error("fetch error"))
        })

        await expect(fetchData.createUser("test")).rejects.toThrow("fetch error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('createUser resloves correctly when user data is fetched successfully but without children', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        role: "testRole",
                        profileImage: "testImage",
                        room: "testRoom"
                    })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                } as Response)
            }
            return Promise.reject("error")
        })

        const user: User = await fetchData.createUser("test")

        expect(user.getUsername()).toBe("test")
        expect(user.getRole()).toBe("testRole")
        expect(user.getProfileImage()).toBe("testImage")
        expect(user.getRoom()).toBe("testRoom")
        expect(user.getChildren()?.length).toBe(0)
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('createUser rejects with an error when children data fetch fails', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        role: "testRole",
                        profileImage: "testImage",
                        room: "testRoom"
                    })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.reject(new Error("children fetch error"))
            }
            return Promise.reject("error")
        })

        await expect(fetchData.createUser("test")).rejects.toThrow("children fetch error")
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('createUser resolves correctly when user data is fetched successfully without id', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        username: "test",
                        role: "testRole",
                        profileImage: "testImage",
                        room: "testRoom"
                    })
                } as Response)
            }
            if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                } as Response)
            }
            return Promise.reject("error")
        })

        const user: User = await fetchData.createUser("test")

        expect(user.getUsername()).toBe("test")
        expect(user.getRole()).toBe("testRole")
        expect(user.getProfileImage()).toBe("testImage")
        expect(user.getRoom()).toBe("testRoom")
        expect(user.getChildren()?.length).toBe(0)
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('createUser sets role correctly', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        role: "testRole"
                    })
                } as Response)
            }
            if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                } as Response)
            }
            return Promise.reject("error")
        })
    
        const user: User = await fetchData.createUser("test")
    
        expect(user.getRole()).toBe("testRole")
        expect(fetch).toHaveBeenCalledTimes(2)
    })
    
    test('createUser sets profile image correctly', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        profileImage: "testImage"
                    })
                } as Response)
            }
            if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                } as Response)
            }
            return Promise.reject("error")
        })
    
        const user: User = await fetchData.createUser("test")
    
        expect(user.getProfileImage()).toBe("testImage")
        expect(fetch).toHaveBeenCalledTimes(2)
    })
    
    test('createUser sets room correctly', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        id: 1,
                        username: "test",
                        room: "testRoom"
                    })
                } as Response)
            }
            if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                } as Response)
            }
            return Promise.reject("error")
        })
    
        const user: User = await fetchData.createUser("test")
    
        expect(user.getRoom()).toBe("testRoom")
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('toggleChildIsAttending resolves correctly when attendance is toggled successfully', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    message: "Attendance toggled successfully"
                })
            } as Response)
        })

        const response = await fetchData.toggleChildIsAttending(1)

        expect(response).toBe("Attendance toggled successfully")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('toggleChildIsAttending rejects with an error when fetch fails', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject(new Error("fetch error"))
        })

        await expect(fetchData.toggleChildIsAttending(1)).rejects.toThrow("fetch error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('toggleUserRoom resolves correctly when room is toggled successfully', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    message: "Room toggled successfully"
                })
            } as Response)
        })

        const response = await fetchData.toggleUserRoom(1, "newRoom")

        expect(response).toBe("Room toggled successfully")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('toggleUserRoom rejects with an error when fetch fails', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject(new Error("fetch error"))
        })

        await expect(fetchData.toggleUserRoom(1, "newRoom")).rejects.toThrow("fetch error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('toggleUserRoom resolves correctly when response does not contain message', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({})
            } as Response)
        })

        const response = await fetchData.toggleUserRoom(1, "newRoom")

        expect(response).toBeUndefined()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('createChildrenList fetches children data correctly', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ id: 1 })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        1: {
                            "0": 1,
                            "1": "testName",
                            "2": "testDob",
                            "3": "2023/10/01",
                            "4": 1
                        }
                    })
                } as Response)
            }
            return Promise.reject("error")
        })

        const children = await fetchData.createChildrenList("test")

        expect(children.length).toBe(1)
        expect(children[0].getFirstName()).toBe("testName")
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('createChildrenList fetches children data correctly when children/family url json function returns key 4 to be something other than 1', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ id: 1 })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({
                        1: {
                            "0": 1,
                            "1": "testName",
                            "2": "testDob",
                            "3": "2023/10/01",
                            "4": 0
                        }
                    })
                } as Response)
            }
            return Promise.reject("error")
        })

        const children = await fetchData.createChildrenList("test")

        expect(children.length).toBe(1)
        expect(children[0].getFirstName()).toBe("testName")
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    test('createChildrenList handles fetch error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject(new Error("fetch error"))
        })

        await expect(fetchData.createChildrenList("test")).rejects.toThrow("fetch error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('createChildrenList fetches no children data', async () => {
        global.fetch = jest.fn((url) => {
            if (url.toString().includes("users")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({ id: 1 })
                } as Response)
            } else if (url.toString().includes("children/family")) {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve({})
                } as Response)
            }
            return Promise.reject("error")
        })
    
        const children = await fetchData.createChildrenList("test")
    
        expect(children.length).toBe(0)
        expect(fetch).toHaveBeenCalledTimes(2)
    })

    // Tests for getChildrenByRoomName
    test('getChildrenByRoomName fetches children data correctly', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    1: {
                        "0": 1,
                        "1": "testName",
                        "2": "testDob",
                        "3": "2023/10/01",
                        "4": 1
                    }
                })
            } as Response)
        })

        const children = await fetchData.getChildrenByRoomName("testRoom")

        expect(children.length).toBe(1)
        expect(children[0].getFirstName()).toBe("testName")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('getChildrenByRoomName fetches children data correctly when json function returns a value for key 4 that is something other than 1', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    1: {
                        "0": 1,
                        "1": "testName",
                        "2": "testDob",
                        "3": "2023/10/01",
                        "4": 0
                    }
                })
            } as Response)
        })

        const children = await fetchData.getChildrenByRoomName("testRoom")

        expect(children.length).toBe(1)
        expect(children[0].getFirstName()).toBe("testName")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('getChildrenByRoomName handles fetch error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject(new Error("fetch error"))
        })

        await expect(fetchData.getChildrenByRoomName("testRoom")).rejects.toThrow("fetch error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('getChildrenByRoomName handles json.error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ error: "error" })
            } as Response)
        })

        await expect(fetchData.getChildrenByRoomName("testRoom")).rejects.toThrow("error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    // Tests for getEducatorsByRoomName
    test('getEducatorsByRoomName fetches educators data correctly', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    1: {
                        "0": 1,
                        "1": "testEducator"
                    }
                })
            } as Response)
        })

        const educators = await fetchData.getEducatorsByRoomName("testRoom")

        expect(educators.length).toBe(1)
        expect(educators[0].getUsername()).toBe("testEducator")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('getEducatorsByRoomName handles fetch error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.reject(new Error("fetch error"))
        })

        await expect(fetchData.getEducatorsByRoomName("testRoom")).rejects.toThrow("fetch error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    test('getEducatorsByRoomName handles json.error', async () => {
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({ error: "error" })
            } as Response)
        })

        await expect(fetchData.getEducatorsByRoomName("testRoom")).rejects.toThrow("error")
        expect(fetch).toHaveBeenCalledTimes(1)
    })
})