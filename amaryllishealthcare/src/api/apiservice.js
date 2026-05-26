export const apiurl = import.meta.env.VITE_API_URL

export default {
    fetchMedicalDevices: async function (medicalname) {
        try {
            const response = await fetch(`${apiurl}/api/products?filters[category][AMD_CatTitle][$eq]=${medicalname}${'&populate=*'}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching medical devices:', error);
            return { error: error.message };
        }
    },
    fetchAllProducts: async function () {
        try {
            const response = await fetch(`${apiurl}/api/products?populate[category]=true&populate[image]=true&pagination[page]=1&pagination[pageSize]=200`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching medical devices:', error);
            return { error: error.message };
        }
    },
    searchProductByKeyword: async function (query) {
        try {
            const response = await fetch(`${apiurl}/api/products` +
                `?filters[AMD_Title][$containsi]=${query}` +
                `&sort=AMD_GloabalSearchOrder:asc` +
                `&pagination[pageSize]=10` +
                `&populate=category`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching medical devices:', error);
            return { error: error.message };
        }
    },
    fetchProductDetailById: async function (prodname) {
        try {
            const response = await fetch(`${apiurl}/api/products?${`filters[AMD_Title][$eq]=${prodname}`}${'&populate=*'}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    fetchCategories: async function () {
        try {
            const response = await fetch(`${apiurl}/api/categories?${'populate[image]=true&populate[AMD_DeskBanner]=true&populate[AMD_MobileBanner]=true'}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    fetchBlogCategories: async function () {
        try {
            const response = await fetch(`${apiurl}/api/blogcategories`, {
                method: 'GET'
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            throw error;
        }
    },
    fetchProductsByCatId: async function (catname) {
        try {
            const response = await fetch(`${apiurl}/api/products?filters[category][AMD_CatTitle][$eq]=${catname}&populate[image]=true&populate[category]=true&pagination[page]=1&pagination[pageSize]=200`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    postCareerContactData: async function (formData) {
        try {
            const response = await fetch(`${apiurl}/api/contact`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error(`Failed to add contact data: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    },
    fetchSearchProducts: async function () {
        try {
            const response = await fetch(`${apiurl}/api/products?${'populate=image'}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching medical devices:', error);
            return { error: error.message };
        }
    },
    fetchBlogsList: async function () {
        try {
            const response = await fetch(`${apiurl}/api/blogs?populate=*&pagination[page]=1&pagination[pageSize]=100`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            if (data) {
                return data;
            } else {
                return null
            }
        } catch (error) {
            throw error;
        }
    },
    fetchCareersList: async function () {
        try {
            const response = await fetch(`${apiurl}/api/careeropportunities?populate=*`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();

            if (data && data?.data && data?.data?.length > 0) {
                return data?.data[0]?.AMD_CareerTable;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching blog categories:', error);
            throw error;
        }
    },
    fetchBlogDetailByID: async function (id) {
        try {
            const response = await fetch(`${apiurl}/api/blogs?filters[AMD_BlogurlName][$eq]=${id}&populate[AMD_BlogListsContent][populate]=AMD_BlogImage`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            if (data) {
                return data;
            } else {
                return null
            }
        } catch (error) {
            console.error('Error fetching blogs details :', error);
            throw error;
        }
    },
    fetchFeaturedProducts: async function () {
        try {
            const response = await fetch(`${apiurl}/api/products?filters[AMD_Productdiff][$eq]=FEATURED&populate[category]=true&populate[image]=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching featured  products:', error);
            throw error;
        }
    },
    fetchHomeBanners: async function () {
        try {
            const response = await fetch(`${apiurl}/api/homebanners?${'populate=*'}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch home banners: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    fetchMainSliders: async function () {
        try {
            const response = await fetch(`${apiurl}/api/mainsliders?${'populate=*'}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch main sliders: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    fetchSolutionKits: async function () {
        try {
            const response = await fetch(`${apiurl}/api/solutioncapabilites?populate=*`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch main sliders: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    fetchSolutionKitsDetailsByName: async function (urlsolvalue) {
        try {
            const response = await fetch(`${apiurl}/api/solutioncapabilites?${`filters[AMD_SOLURLName][$eq]=${urlsolvalue}`}${`&populate=*`}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch solution caps: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    fetchKeywordBuckets: async function () {
        try {
            const response = await fetch(`${apiurl}/api/keywordbuckets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch main sliders: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {

        }
    },
    fetchSeoContentsByType: async function (prodname) {
        try {
            const response = await fetch(`${apiurl}/api/seotypecontents?${`filters[AMD_SEOTypeValue][$eq]=${prodname}`}${'&populate=*'}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch seo contents: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }
} 