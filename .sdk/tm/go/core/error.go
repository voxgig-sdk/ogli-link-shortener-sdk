package core

type OgliLinkShortenerError struct {
	IsOgliLinkShortenerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOgliLinkShortenerError(code string, msg string, ctx *Context) *OgliLinkShortenerError {
	return &OgliLinkShortenerError{
		IsOgliLinkShortenerError: true,
		Sdk:              "OgliLinkShortener",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OgliLinkShortenerError) Error() string {
	return e.Msg
}
