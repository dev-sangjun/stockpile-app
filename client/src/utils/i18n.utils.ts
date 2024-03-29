import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    detection: { order: ["localStorage", "navigator"] },
    resources: {
      "en-US": {
        translation: {
          "Are you sure you want to delete":
            "Are you sure you want to delete {{entityName}}?",
          Hello: "Hello, {{username}}",
          "Successfully added": "Successfully added {{entityName}}!",
          "Today is": "Today is {{date}}",
        },
      },
      "ko-KR": {
        translation: {
          "Add Investment": "종목 추가하기",
          "Add Portfolio": "포트폴리오 추가하기",
          "Already have an account?": "이미 계정이 있으신가요?",
          "Are you sure you want to delete":
            "{{entityName}}를/을 삭제하시겠습니까?",
          "Are you sure you want to sign out?": "로그아웃 하시겠습니까?",
          Cancel: "취소",
          Confirm: "확인",
          Current: "현재",
          "Current Price": "주당 가격",
          "Current Balance": "현재 평가금액",
          Dashboard: "대시보드",
          "Day Change": "전일비",
          Delete: "삭제하기",
          "Delete account": "계정 삭제",
          "Delete Investment": "종목 삭제하기",
          "Delete Portfolio": "포트폴리오 삭제하기",
          Distribution: "종목 분포",
          "Don't have an account?": "아직 계정이 없으세요?",
          Email: "이메일",
          "Email is required.": "이메일을 입력하세요.",
          "Go to Portfolios and add your first portfolio!":
            "포트폴리오 탭으로 가서 새로운 포트폴리오를 추가하세요!",
          "Favorite Stocks": "즐겨찾기",
          Goal: "목표",
          "Goal amount is required.": "목표금액을 입력하세요.",
          "Goal Progress": "목표 진행상태",
          Hello: "반가워요, {{username}}님",
          "Let's first add an investment.": "아직은 표시할 종목이 없네요...",
          Investments: "보유종목",
          "Add your first portfolio to get started!":
            "시작하려면 새로운 포트폴리오를 추가하세요!",
          "Net Worth": "총 자산",
          "New Password": "새로운 비밀번호",
          "New password is required.": "새로운 비밀번호를 입력하세요.",
          Overview: "모아보기",
          Password: "비밀번호",
          "Password is required.": "비밀번호를 입력하세요.",
          "Password must have at least 8 characters.":
            "비밀번호는 8자리 이상이어야 합니다.",
          "Portfolio name": "포트폴리오 이름",
          Portfolios: "포트폴리오",
          "Portfolio Values": "포트폴리오 분석하기",
          Portion: "차지비율",
          Price: "매수가",
          Progress: "달성률",
          Qty: "수량",
          Quantity: "수량",
          "Refreshing the data...": "데이터 새로고침중...",
          "Search stocks...": "종목을 검색하세요...",
          Settings: "설정",
          Shares: "수량",
          "Sign in": "로그인",
          "Sign in failed.": "로그인에 실패했습니다.",
          "Sign out": "로그아웃",
          "Sign up": "가입하기",
          "Something went wrong!": "알 수 없는 문제가 발견되었어요!",
          "Successfully added": "{{entityName}} 추가완료!",
          "Successfully deleted the investment!": "종목 삭제완료!",
          "Successfully deleted the portfolio!": "포트폴리오 삭제완료!",
          "Successfully deleted the user!": "계정 삭제완료!",
          "Successfully refreshed the data!": "데이터 새로고침완료!",
          "Successfully signed up!": "가입완료!",
          "Successfully updated": "{{entityName}} 수정완료!",
          "Successfully updated the goal amount!": "목표금액 수정완료!",
          "Successfully updated the investment!": "종목 수정완료!",
          "Successfully updated the password!": "비밀번호 수정완료!",
          Symbol: "종목",
          "Today is": "오늘은 {{date}} 입니다.",
          "Total Balance": "총 평가금액",
          "Total Gain/Loss": "총 평가손익",
          "Total Invested": "총 투자금액",
          "Type DELETE to confirm": "삭제하려면 DELETE를 입력하세요.",
          Update: "수정하기",
          "Updated!": "수정완료!",
          "Update goal amount": "목표금액 변경",
          "Update Investment": "종목 수정하기",
          "Update password": "비밀번호 변경",
          "Update Portfolio": "프토폴리오 수정하기",
          Username: "닉네임",
          "Username is required.": "닉네임을 입력하세요.",
          "Username must have at least 2 characters.":
            "닉네임은 2자리 이상이어야 합니다.",
          Value: "평가금액",
          "We'll help you reach your financial goal!":
            "이제 재무상태는 저희에게 맡기세요!",
          "You don't have any favorite stock yet?":
            "아직 좋아하는 종목이 없나요?",
        },
      },
    },
    fallbackLng: "en-US",

    interpolation: {
      escapeValue: false,
    },
  });
