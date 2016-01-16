#version 120
// Application to vertex shader
varying vec3 V;
varying vec3 N;
varying vec3 I;
varying vec4 Cs;

void main()
{
 vec4 P = gl_ModelViewMatrix * gl_Vertex;
 I  = P.xyz - vec3 (0);
 N  = gl_NormalMatrix * gl_Normal;
 Cs = gl_Color;
 V = gl_Vertex.xyz;
 gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}