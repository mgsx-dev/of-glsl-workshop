#version 120

uniform float time;

varying vec3 V;
varying vec3 N;
varying vec3 I;


void main()
{
	float light = abs(dot(normalize(-N), normalize(-I)));
	
	vec3 color = vec3(0.5, 0.2, 0.01);
	if(light > 0.95)
	{
		color = vec3(1.0, 1.0, 1.0);
	}
	else if(light > 0.5)
	{
		color = vec3(1.0, 0.7, 0.7);
	}
	
	gl_FragColor = vec4(color, 1.0);
}