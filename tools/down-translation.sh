#!/bin/sh

check_env_vars() {
    local varname="$1"
    local var="$2"
    local usage="$3"

    if [ "x$var" == "x" ]; then
        echo "Env Var Missing: \`$varname\` - $usage"
        exit 1
    fi
}

check_bin() {
    local binname="$1"

    if [ "x$binname" == "x" ]; then
        echo "Bin Name Empty"
        exit 2
    fi

    local binpath="$(command -v $binname)"
    if [ "x$binpath" == "x" ]; then
        echo "Bin not found: \`$binname\`"
        exit 2
    fi
}

download() {
    echo "Downloading archive ..."
    wget \
        "https://github.com/peaceshi/translation-maker/releases/latest/download/translations.zip" \
        -q \
        -O "$TRM_TMP_ZIP"
}

extract() {
    echo "Extracting archive ..."
    unzip \
        -o \
        -u \
        -j \
        "$TRM_TMP_ZIP" \
        -d "$TRM_TARGET_DIR"
}

check_env_vars "TRM_TMP_ZIP" "$TRM_TMP_ZIP" "temporary zip path"
check_env_vars "TRM_TARGET_DIR" "$TRM_TARGET_DIR" "target directory"

check_bin "wget"
check_bin "unzip"

download
extract
