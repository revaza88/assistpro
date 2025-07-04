@echo off
echo.
echo ====================================================
echo   GitHub-ზე AssistPro-ს ატვირთვის ინსტრუქცია
echo ====================================================
echo.
echo 1. GitHub.com-ზე გადით
echo 2. + (პლუს) ღილაკზე დააჭირეთ > New repository
echo 3. Repository name: assistpro
echo 4. Description: Professional Services Website - React + TypeScript + Express
echo 5. Public ან Private აირჩიეთ
echo 6. "Create repository" ღილაკზე დააჭირეთ
echo.
echo ====================================================
echo   ამის შემდეგ PowerShell-ში გაუშვით:
echo ====================================================
echo.
echo git remote add origin https://github.com/[your-username]/assistpro.git
echo git branch -M main
echo git push -u origin main
echo.
echo ====================================================
echo   მაგალითად, თუ username არის "john":
echo ====================================================
echo.
echo git remote add origin https://github.com/john/assistpro.git
echo git branch -M main  
echo git push -u origin main
echo.
echo ====================================================
echo   წარმატების შემთხვევაში ნახავთ:
echo ====================================================
echo.
echo "130 files changed, 23985 insertions(+)"
echo "Branch 'main' set up to track remote branch 'main'"
echo.
pause
