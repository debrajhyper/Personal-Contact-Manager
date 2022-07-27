export const createFormData = (data) => {
    return Object.keys(data).reduce((formData, key) => {
        // console.log(key, data[key])
        if(key === 'country'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`country.${key}`, value)
            });
        }
        else if(key === 'mobileNumber'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`mobileNumber.${key}`, value)
            });
        }
        else if(key === 'socialLinks'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`socialLinks.${key}`, value)
            });
        }
        else if(key === 'telephoneNumber'){
            Object.entries(data[key]).map(([key, value]) => {
                return formData.append(`telephoneNumber.${key}`, value)
            });
        }
        // else if(key === 'zodiacSign'){
        //     formData.append('zodiacSign', data[key].name)
        // }
        // else if(key === 'dateOfBirth'){
        //     formData.append(key, data[key].split('-').reverse().join('-'))
        // }
        else {
            formData.append(key, data[key]);
        }
        return formData;
    }, new FormData());
};