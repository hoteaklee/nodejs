// 셀레니엄을 이용해서 k-apt.go.kr에서
// 2023년, 1월 , 서울특별시, 강남구, 삼성동, 아아파크삼성 apt의
// 지상/지하 주차장수 추출

const { Builder, Browser, By, Key, until, Select } = require('selenium-webdriver');

async function main() {
    const URL = 'http://k-apt.go.kr';
    const chrome = await new Builder().forBrowser(Browser.CHROME)
        .build();

    try {
        await chrome.get(URL);

        // 우리단지 기본정보 버튼이 표시될때까지 5초 대기
        //await chrome.wait(until.elementLocated(By.css('.wp220 li:first-child')), 5000);
        await chrome.wait(until.elementLocated(By.xpath('//a[@title="우리단지 기본정보"]')), 5000);


        //단지정보 버튼 클릭
        //let danjibtn = await chrome.findElement(By.css('#nav li:first-child'));
        let danjibtn = await chrome.findElement(By.xpath('//a[@title="단지정보"]')); //@:속성
        await chrome.actions().move({origin: danjibtn}).click().perform();
        await sleep(1000);

        // 우리단지 기본정보 버튼 클릭
        //let wooribtn = await chrome.findElement(By.css('.wp220 li:first-child'));
        let wooribtn = await chrome.findElement(By.xpath('//a[@title="우리단지 기본정보"]'));
        await chrome.actions().move({origin: wooribtn}).click().perform();
        await sleep(1000);

        //--------------------------
        // 검색할 아파트를 변수로 선언
        let syear = '2023년';
        let smonth = '01월';
        let sido = '서울특별시';
        let gugun = '강남구';
        let dong = '삼성동';
        let apt = '아이파크삼성동';

        // 검색년도 값 설정
        let select = await chrome.findElement(By.name('searchYYYY'));
        await new Select(select).selectByVisibleText(syear); //selectByVisibleText : 보이는 메뉴 선택
        await sleep(500);

        // 검색월 값 설정
        select = await chrome.findElement(By.name('searchMM'));
        await new Select(select).selectByVisibleText(smonth);
        await sleep(500);

        // 검색시도 값 설정
        select = await chrome.findElement(By.name('combo_SIDO'));
        await new Select(select).selectByVisibleText(sido);
        await sleep(500);

        // 검색구군 값 설정
        select = await chrome.findElement(By.name('combo_SGG'));
        await new Select(select).selectByVisibleText(gugun);
        await sleep(500);

        // 검색동 값 설정
        select = await chrome.findElement(By.name('combo_EMD'));
        await new Select(select).selectByVisibleText(dong);
        await sleep(500);

        // 검색결과 출력 - 아파트명 , 주소
        let apts = await chrome.findElements(By.css('.aptS_rLName')); //여러개라서 s  붙임 :findElements
        let aptaddrs = await chrome.findElements(By.css('.aptS_rLAdd'));


        for (let apt of apts){
            console.log(await apt.getAttribute('textContent')) ;
        }
        await sleep(3000);

        for (let addr of aptaddrs){
            console.log(await addr.getAttribute('textContent'));
        }



        await chrome.sleep(3000);


    } catch (ex){
        console.log(ex);
    }finally {
        await chrome.quit();
    }


}; // main



const sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms));

main();