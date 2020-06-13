export default function postData(url, formData, setResponse) {
    
    fetch(
        url,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            },
            body: new URLSearchParams(formData)
        }
    ).then(
        response => {
            try {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                setResponse(response => ({ ...response, error: error }));
            }
        }
    ).then(
        data => {
            if ("success" in data) {
                setResponse(response => ({ ...response, success: data.success }));
            } else if ("error" in data) {
                setResponse(response => ({ ...response, error: data.error }));
            } else {
                setResponse(response => ({ ...response, error: "An error was encountered (101)" }));
            }
        }
    ).catch(
        error => {
            return setResponse(response => ({ ...response, error: "An error was encountered (102)" }));
        }
    );
}