@echo off
@title Gravity Simulator Launcher by Toslaw (User xD)
cls
goto start
:start
@cls
@echo 1. Play
@echo 2. Quit
@echo 3. Credits
@echo 4. Our Discord
@echo 5. Version
@set /p st=" >>"
@if %st%==1 goto index
@if %st%==2 goto quit
@if %st%==3 goto credits
@if %st%==4 goto discord
@if %st%==5 goto ver
:error
@cls
@echo It is not any option.
@pause
@goto start
:index
@cls
@start index.html
@exit
:quit
@cls
@echo Are you sure you want to quit? (y/n)
@set /p q=" >>"
@if %q%==y exit
@if %q%==n goto start
@goto error
:credits
@cls
@echo Music: Calin Avram
@echo Game programming: Matei Adriel Rafael
@echo Website: Jack Moul
@echo Launcher Programming: Toslaw1 (User xD)
@pause
@goto start
:ver
@cls
@echo Gravity Simulator Launcher by Toslaw (User xD) 1.0.1
@pause
@goto start
:discord
@cls
@echo.
@pause
@goto start