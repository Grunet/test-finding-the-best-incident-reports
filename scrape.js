let offset = "";
let numIterations = 1;

const rowBase = 40;
const maxNumIterations = 100;

const records = [];

(async function () {
    while (numIterations < maxNumIterations) {
        const res = await fetch(
            "https://www.thevoid.community/v1/integrations/airtable/80b4ceb8-e1ce-4c9f-9712-500c2a2bb4c7/appxutZjYbRCdp1PQ/Incidents/records?block_id=511f9599-c966-4e33-a0bd-b4b4ce4d6a26",
            {
                "credentials": "include",
                "headers": {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0",
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Content-Type": "application/json; charset=utf-8",
                    "softr-page-id": "7f4e1939-178d-4fa0-89fa-4f55f96b36e1",
                    "X-Requested-With": "XMLHttpRequest",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-origin",
                    "Priority": "u=0",
                },
                "referrer": "https://www.thevoid.community/database",
                "body":
                    `{\"page_size\":${rowBase},\"view\":\"Newest\",\"offset\":\"${offset}\",\"rows\":${
                        rowBase * numIterations
                    }}`,
                "method": "POST",
                "mode": "cors",
            },
        );

        //TODO - check the response status

        const json = await res.json();

        // console.log(JSON.stringify(json, null, 4)); // Log the response body for debugging

        console.log(json.offset);
        console.log(rowBase * numIterations);

        records.push(...json.records);

        if (offset === "null") {
            break;
        }

        numIterations++;
        offset = json.offset;
    }

    await Deno.writeTextFile("void.json", JSON.stringify({ records }, null, 4));
})();
