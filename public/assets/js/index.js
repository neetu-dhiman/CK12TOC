

(
    function () {
        const getBooks = async function () {
            try {
                const response = await fetch('http://localhost:3000/api/book/maths');
                const books = await response.json();
                return books;
            } catch (err) {
                throw Error('error occurred while fetching books');
            }
        }

        const getBookdetails = async function (params) {
            try {
                const bookid = window.location.href.split("/")[4];
                const url = `http://localhost:3000/api/book/${bookid}/section/${params.section}`;
                const response = await fetch(url);
                const bookdetails = await response.json();
                return bookdetails;
            } catch(err) {
                throw Error('error occurred while fetching book chapters');
            }
        }

        function renderChildElement(params) {
            getBookdetails(params)
                .then((res) => {
                    const section = params.section;
                    const accordianContent = document.getElementById(`accordian-content_${section}`);
                    if (res && res.response && res.status === "OK" && res.response[section].length > 0) {
                        const chapterArray = res.response[section];
                        chapterArray.sort((firstChapter, secondChapter) => firstChapter.sequenceNO > secondChapter.sequenceNO);
                        console.log(chapterArray);
                        let html = `<ul class="accordian-list">`;
                        chapterArray.forEach(element => {
                            html += `<li>${element.title}</li>`;
                        });
                        html += `</ul>`;
                        accordianContent.innerHTML = html;
                    } else {
                        let html = `<ul class="accordian-list"><li>${res.response.message}</li></ul>`;
                        accordianContent.innerHTML = html;
                    }
                });
        }

        const conceptContainer = document.getElementById("concept-container");
        window.addEventListener('DOMContentLoaded', (event) => {
            console.log('DOM fully loaded and parsed');
            getBooks().then((res) => {
                let html = '';
                res.response.forEach((element, index) => {
                    // console.log(element);
                    html += `
                    <div class="accordian-tab">
                    <input type="checkbox" id="toggle_${element.id}" class="accordian-toggle" name="toggle">
                    <label for="toggle_${element.id}">${element.title}</label>
                    <div class="accordian-content" id="accordian-content_${element.id}">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, vitae.</p>
                    </div>
                </div>
                `;
                    renderChildElement({ section: element.id });
                });
                conceptContainer.innerHTML = html;
            });

        });
    }
)();


