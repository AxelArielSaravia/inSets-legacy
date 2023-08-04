#! /bin/bash

#This Build use:
# Bun.js to bundle and minify javascript (https://bun.sh/)
# tdewolff/minify to minify html, css and json (https://github.com/tdewolff/minify)

prod=false

while getopts ":p" option; do
    case $option in
    p)
        prod=true
        ;;
    esac
done

if [ $prod = true ]; then
    output=./build
else
    output=./dev-server
fi

input=./src

html_o=$output/index.html
html_fl=($input/html/head.html $input/html/head-index.html $input/html/index.html)
html_4_o=$output/404.html
html_4_fl=($input/html/head.html $input/html/head-404.html $input/html/404.html)

css_g_o=$output/global.css
css_g_fl=$input/global.css
css_o=$output/index.css
css_fl=(
    $input/index.css
    $input/components/App.css
    $input/components/Range.css
    $input/components/GlobalButtons.css
    $input/components/AddAndSubtract.css
    $input/components/Panel/Sets.css
    $input/components/Panel/PanelRange.css
    $input/components/Panel/PanelSwitcher.css
    $input/components/Panel/PanelContainer.css
    $input/components/Panel/PanelConfigSection.css
    $input/components/Panel/PanelButtonsSection.css
    $input/components/Panel/PanelConfigContainer.css
    $input/components/Audio/AudioElement.css
    $input/components/Audio/AudioPlayback.css
    $input/components/Audio/AudioContainer.css
)

js_fl=$input/main.jsx

if [ ! -d $output ];
then
    echo "create $output"
    mkdir $output
fi

if [ $prod = true ];
then
    #HTML
    minify -v -o $html_4_o -b ${html_4_fl[*]}
    minify -v -o $html_o ${html_fl[*]}

    #CSS
    minify -v -o $css_g_o $css_g_fl
    minify -v -o $css_o -b ${css_fl[*]}

    #JS
    bun build $input/theme.js --outdir $output --minify
    bun build $js_fl --outdir $output --minify
    bun build $input/pwasw.js --outdir $output --minify

    if [ ! -d $output/media ];
    then
        cp -dr ./media $output/media
        echo "Copy ./media to $output/media"
    fi

    #Manifest
    cat $input/manifest.json | minify -v --type=json > $output/app.webmanifest
else
    #HTML
    if [ ! -f $html_4_o ];
    then
        touch $html_4_o
    else
        echo > $html_4_o
    fi

    if [ ! -f $html_o ];
    then
        touch $html_o
    else
        echo > $html_o
    fi
    cat ${html_4_fl[*]} > $html_4_o
    echo "Concatenate ${html_4_fl[*]} to $html_4_o"

    cat ${html_fl[*]} > $html_o
    echo "Concatenate ${html_fl[*]} to $html_o"

    #CSS
    if [ ! -f $css_o ];
    then
        touch $css_o
    else
        echo > $css_o
    fi

    cp $css_g_fl $css_g_o
    echo "Copy ${css_g_fl} to $css_g_o"

    cat ${css_fl[*]} > $css_o
    echo "Concatenate ${css_fl[*]} to $css_o"

    #JS
    bun build $input/theme.js --outdir $output --minify
    bun build $js_fl --outdir $output --minify
    bun build $input/pwasw.js --outdir $output --minify

    #Manifest
    cp $input/manifest.json $output/app.webmanifest
    echo "Copy $input/manifest.json to $output/app.webmanifest"
fi
