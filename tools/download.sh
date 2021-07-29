#!/bin/sh
_green() {
    printf '\033[1;31;32m'
    printf -- "%b" "$1"
    printf '\033[0m'
}

_red() {
    printf '\033[1;31;31m'
    printf -- "%b" "$1"
    printf '\033[0m'
}

_yellow() {
    printf '\033[1;31;33m'
    printf -- "%b" "$1"
    printf '\033[0m'
}

usage() {
    cat <<-EOF
Usage: sh down-translation.sh [options] -o FILE
Valid options are:
    -o, --output <Dir>
            Output dir
    -i, --insecure
            Force bypass certificate validation (insecure)
    -h, --help
            Usage
EOF
    exit $1
}

clean_and_exit(){
    # Clean up temp files
    printf 'Cleaning up... '
    rm -rf $TMP_DIR
    _green 'Done\n\n'
    [ $1 -eq 0 ] && _green 'Job Finished.\n\n' || _red 'Exit with Error code '$1'.\n'
    exit $1
}

check_depends(){
    which 7za mktemp >/dev/null
    if [ $? != 0 ]; then
        _red 'Error: Missing Dependency.\nPlease check whether you have the following binaries on you system:\nwhich, 7za, mktemp.\n'
        exit 3
    fi
    which curl >/dev/null
    if [ $? != 0 ]; then
        which wget >/dev/null
        if [ $? != 0 ]; then
            _red 'Error: Missing Dependency.\nEither curl or wget required.\n'
            exit 3
        fi
        USE_WGET=1
    else
        USE_WGET=0
    fi
}
get_args(){
    while [ ${#} -gt 0 ]; do
        case "${1}" in
            --help | -h)
                usage 0
                ;;
            --output | -o)
                OUT_DIR="$2"
                shift
                ;;
            --insecure | -i)
            CURL_EXTARG='--insecure'
            WGET_EXTARG='--no-check-certificate'
            ;;
            *)
                _red "Invalid argument: $1"
                usage 1
                ;;
        esac
        shift 1
    done

    # Check path & file name
    if [ -z $OUT_DIR ]; then
        _red 'Error: Please specify the path to the output file(using -o/--output argument).\n'
        exit 1
    else
        if [ ${OUT_DIR}a != ${OUT_DIR%/*}a ] && [ ! -d ${OUT_DIR%/*} ]; then
            _red 'Error: Folder do not exist: '${OUT_DIR%/*}'\n'
            exit 1
        fi
    fi
}
process(){
    # Set Global Var
    BASE_URL="https://github.com/peaceshi/translation-maker/releases/latest/download/translations.zip"
    TMP_DIR=`mktemp -d /tmp/translations.XXXXXX`
    TMP_ZIP="$TMP_DIR/translations.zip"
    BAK_DIR="$OUT_DIR/LANGUAGE-bak"
    LNG_DIR="$OUT_DIR/LANGUAGE"
    # Fetch translations
    printf 'Fetching translations... '
    if [ $USE_WGET = 0 ]; then
        curl -s -L $CURL_EXTARG -o$TMP_ZIP $BASE_URL
    else
        wget -q $WGET_EXTARG -O$TMP_ZIP $BASE_URL
    fi
    if [ $? != 0 ]; then
        _red '\nFailed to fetch translations.zip. Please check your Internet connection, and check TLS support for curl/wget.\n'
        clean_and_exit 2
    fi

    rm -rf $BAK_DIR
    mv $LNG_DIR $BAK_DIR

    7za x $TMP_ZIP -y -o$OUT_DIR
    mv $OUT_DIR/translations $LNG_DIR
    _green 'Done\n\n'

    # Clean up
    clean_and_exit 0
}
main() {
    if [ -z "$1" ]; then
        usage 0
    else
        check_depends
        get_args "$@"
        _green '\nJob Started.\n\n'
        process
    fi
}

main "$@"
