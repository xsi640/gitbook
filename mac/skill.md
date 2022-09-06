# go2shell
- Works with Terminal.app, iTerm2, xterm. Name another and we will add it.
- Native icon in Finder toolbar
- Tabs
- Retina display support
- https://zipzapmac.com/Go2Shell

# alfred open iterm
Terminal/Shell Application: custom

script:
```
on alfred_script(q)  
    if application "iTerm2" is running or application "iTerm" is running then  
        run script "  
            on run {q}  
                tell application \":Applications:iTerm.app\"  
                    activate  
                    try  
                        select first window  
                        set onlywindow to false  
                    on error  
                        create window with default profile  
                        select first window  
                        set onlywindow to true  
                    end try  
                    tell current session of the first window  
                        if onlywindow is false then  
                            tell split vertically with default profile  
                                write text q  
                            end tell  
                        end if  
                    end tell  
                end tell  
            end run  
        " with parameters {q}  
    else  
        run script "  
            on run {q}  
                tell application \":Applications:iTerm.app\"  
                    activate  
                    try  
                        select first window  
                    on error  
                        create window with default profile  
                        select first window  
                    end try  
                    tell the first window  
                        tell current session to write text q  
                    end tell  
                end tell  
            end run  
        " with parameters {q}  
    end if  
end alfred_script
```