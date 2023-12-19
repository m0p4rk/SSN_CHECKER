class KoreanIDInfo {
    constructor(idNumber) {
        this.idNumber = idNumber.replace('-', '');
        if (!this.validateFormat()) {
            throw new Error('유효하지 않은 형식의 주민등록번호입니다.');
        }
    }

    validateFormat() {
        return /^\d{13}$/.test(this.idNumber);
    }

    getBirthDate() {
        const yearPrefix = this.idNumber[6] < '3' ? '19' : '20';
        const year = yearPrefix + this.idNumber.substring(0, 2);
        const month = this.idNumber.substring(2, 4);
        const day = this.idNumber.substring(4, 6);
        return `${year}-${month}-${day}`;
    }

    getGender() {
        const genderCode = this.idNumber[6];
        return genderCode === '1' || genderCode === '3' ? '남자' : '여자';
    }

    getRegionCode() {
        return this.idNumber.substring(7, 9);
    }

    getRegionName() {
        // 지역명을 추출합니다.
        const regionMap = {
            '00': '서울특별시',
            '01': '서울특별시',
            '02': '서울특별시',
            '03': '서울특별시',
            '04': '서울특별시',
            '05': '서울특별시',
            '06': '서울특별시',
            '07': '서울특별시',
            '08': '서울특별시',
            '09': '부산광역시',
            '10': '부산광역시',
            '11': '부산광역시',
            '12': '부산광역시',
            '13': '인천광역시',
            '14': '인천광역시',
            '15': '인천광역시',
            '16': '광주광역시',
            '17': '광주광역시',
            '18': '광주광역시',
            '19': '광주광역시',
            '20': '광주광역시',
            '21': '광주광역시',
            '22': '광주광역시',
            '23': '광주광역시',
            '24': '광주광역시',
            '25': '광주광역시',
            '26': '경기도',
            '27': '경기도',
            '28': '경기도',
            '29': '경기도',
            '30': '경기도',
            '31': '경기도',
            '32': '경기도',
            '33': '경기도',
            '34': '경기도',
            '35': '충청북도',
            '36': '충청북도',
            '37': '충청북도',
            '38': '충청북도',
            '39': '충청북도',
            '40': '대전광역시',
            '41': '대전광역시',
            '42': '충청남도',
            '43': '충청남도',
            '44': '충청남도', // 세종특별자치시의 예전 코드
            '45': '충청남도',
            '46': '충청남도',
            '47': '충청남도',
            '48': '전라북도',
            '49': '전라북도',
            '50': '전라북도',
            '51': '전라북도',
            '52': '전라북도',
            '53': '전라북도',
            '54': '전라북도',
            '55': '전라남도',
            '56': '전라남도',
            '57': '전라남도',
            '58': '전라남도',
            '59': '전라남도',
            '60': '전라남도',
            '61': '전라남도',
            '62': '전라남도',
            '63': '전라남도',
            '64': '전라남도',
            '65': '광주광역시', // 광주광역시에 할당된 추가 코드
            '66': '광주광역시', // 광주광역시에 할당된 추가 코드
            '67': '대구광역시',
            '68': '대구광역시',
            '69': '대구광역시',
            '70': '경상북도',
            '71': '경상북도',
            '72': '경상북도',
            '73': '경상북도',
            '74': '경상북도',
            '75': '경상북도',
            '76': '대구광역시', // 대구광역시에 할당된 추가 코드
            '77': '대구광역시', // 대구광역시에 할당된 추가 코드
            '78': '경상북도',
            '79': '경상북도',
            '80': '경상북도',
            '81': '경상북도',
            '82': '경상남도',
            '83': '경상남도',
            '84': '경상남도',
            '85': '울산광역시',
            '86': '경상남도',
            '87': '경상남도',
            '88': '경상남도',
            '89': '경상남도',
            '90': '경상남도',
            '91': '경상남도',
            '92': '경상남도',
            '93': '제주특별자치도',
            '94': '제주특별자치도',
            '95': '제주특별자치도',
            '96': '세종특별자치시' // 세종특별자치시의 현재 코드
          };

        const regionCode = this.getRegionCode();
        return regionMap[regionCode] || '알 수 없는 지역';
    }

    getCheckSum() {
        const multipliers = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(this.idNumber.charAt(i)) * multipliers[i];
        }
        return (11 - (sum % 11)) % 10; // 결과값이 10이면 0으로 처리
    }
    

    validateID() {
        return this.getCheckSum() === parseInt(this.idNumber.charAt(12));
    }

    getFullID() {
        return this.idNumber.slice(0, 6) + '-' + this.idNumber.slice(6);
    }
}

document.getElementById("idCheckForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const idNumber = document.getElementById("idInput").value;
    try {
        const idInfo = new KoreanIDInfo(idNumber);
        if (idInfo.validateID()) {
            document.getElementById("resultText").textContent = `유효한 주민등록번호입니다. 성별: ${idInfo.getGender()}, 생년월일: ${idInfo.getBirthDate()}, 지역: ${idInfo.getRegionName()}`;
        } else {
            document.getElementById("resultText").textContent = "유효하지 않은 주민등록번호입니다.";
        }
    } catch (error) {
        document.getElementById("resultText").textContent = error.message;
    }
});

// document.getElementById("idCheckForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const idNumber = document.getElementById("idInput").value;

//     // 입력값을 로컬 저장소에 저장
//     localStorage.setItem("inputLog", idNumber);

//     try {
//         const idInfo = new KoreanIDInfo(idNumber);
//         if (idInfo.validateID()) {
//             document.getElementById("resultText").textContent = `유효한 주민등록번호입니다. 성별: ${idInfo.getGender()}, 생년월일: ${idInfo.getBirthDate()}, 지역: ${idInfo.getRegionName()}`;
//         } else {
//             document.getElementById("resultText").textContent = "유효하지 않은 주민등록번호입니다.";
//         }
//     } catch (error) {
//         document.getElementById("resultText").textContent = error.message;
//     }
// });

// // 페이지 로드 시 저장된 입력값을 입력란에 표시
// window.addEventListener("load", function() {
//     const savedInput = localStorage.getItem("inputLog");
//     if (savedInput) {
//         document.getElementById("idInput").value = savedInput;
//     }
// });

// Upper code violates several security protocols


// getRegionName() {
//     const regionMap = { /* ... */ };
//     const regionCode = this.getRegionCode();
//     return regionMap[regionCode] || '알 수 없는 지역';
// }

